root = '/RecommendSystemExperiment/CollaborativeFilterGCN'

import sys
sys.path.append(root)

import torch
import numpy as np
import argparse
import torch.optim as optim
from graph.graph import LaplaceGraph
from codes.dataset import FeaturesData, BPRTrainLoader, UserItemData
from codes.performance import evaluate
from layer.lrgccf import LRGCCF
from session.run import Session
from torch.utils.data import DataLoader
import pickle

def parse_args():
    parser = argparse.ArgumentParser(description="gcn")
    parser.add_argument('--dataset_name', default='gowalla', type=str)
    parser.add_argument('--data_path', default=root + '/data', type=str)
    
    parser.add_argument('--emb_size', default=64, type=int)
    parser.add_argument('--num_epoch', default=1000, type=int)
    parser.add_argument('--lr', default=0.001, type=float)
    parser.add_argument('--decay', default=0.001, type=float)
    parser.add_argument('--layers', default=3, type=int)
    parser.add_argument('--batch_size', default=4096, type=int)

    parser.add_argument('--topks', default='[10,20]', type=str)
    parser.add_argument('--log', default= root + '/log/lrgccf', type=str)
    parser.add_argument('--parameters_path', default=root + '/parameters/lrgccf', type=str)
    parser.add_argument('--cores', default=4, type=int)
    parser.add_argument('--load', default=0, type=int)
    return parser.parse_args()



def get_dataloader(train_set, train_U2I, n_items, batch_size, cores):
    gcn_dataloader = BPRTrainLoader(train_set, train_U2I, n_items)
    gcn_dataloader = DataLoader(gcn_dataloader, batch_size, num_workers=cores, shuffle=True)

    return gcn_dataloader

def test(model, n_users, n_items):

    user_emb, item_emb = model.propagate()
    return user_emb.cpu().detach().numpy(), item_emb.cpu().detach().numpy()


if __name__ == '__main__':
    args = parse_args()

    # load movielens-1m
    # data = FeaturesData(args.data_path, args.dataset_name)
    # train_set, train_U2I, test_U2I, n_users, n_items, user_feat = data.load()

    # load gowall
    data = UserItemData(args.data_path, args.dataset_name)
    train_set, train_U2I, test_U2I, n_users, n_items = data.load()

    loader = get_dataloader(train_set, train_U2I, n_items, args.batch_size, args.cores)
    g = LaplaceGraph(n_users, n_items, train_U2I)
    adj = g.generate().cuda()

    gcn = LRGCCF(n_users, n_items, adj, args)
    if args.load==0:
        print("从头开始训练")
        logdata=[]
    else:
        print("load from previous save {:d}".format(args.load))
        with open(args.log+ '_' + args.dataset_name+ '_' + str(args.load) +'.data',"rb") as faa:
            logdata=pickle.load(faa)
        state_dict = torch.load(args.parameters_path + '_' + args.dataset_name + '_' + str(args.load) + '.pth')
        gcn.load_state_dict(state_dict['LRGCCF'])

    gcn = gcn.cuda()

    optimizer = optim.Adam(gcn.parameters(), lr=args.lr)

    sess = Session(gcn)
    #logdata=[]
    f = open(args.log+ '_' + args.dataset_name +'.txt', 'w+')
    for epoch in range(args.load,args.num_epoch):
        print('training '+args.dataset_name+'_lrgccf')
        loss = sess.train(loader, optimizer, args)
        print("epoch:{:d}, loss:[{:.6f}] = mf:[{:.6f}] + reg:[{:.6f}]".format(epoch+1, *loss))
        print("epoch:{:d}, loss:[{:.6f}] = mf:[{:.6f}] + reg:[{:.6f}]".format(epoch+1, *loss), file=f)
        if epoch % 2 == 0:
            gcn.eval()

            with torch.no_grad():
                user_emb, item_emb = test(gcn, n_users, n_items)
                perf_info = evaluate(user_emb,
                                     item_emb,
                                     n_users,
                                     n_items,
                                     train_U2I,
                                     test_U2I,
                                     args)

                print("recall@10:[{:.6f}], ndcg@10:[{:.6f}], recall@20:[{:.6f}], ndcg@20:[{:.6f}]".format(*perf_info), file=f)
                print("recall@10:[{:.6f}], ndcg@10:[{:.6f}], recall@20:[{:.6f}], ndcg@20:[{:.6f}]".format(*perf_info))
                tmp=[epoch+1,*loss,*perf_info]
                logdata.append(tmp)
                # save embedding

                #torch.save((user_emb, item_emb),f=args.parameters_path + '_' + args.dataset_name + '_' + str(epoch + 1) + '.pth')
                torch.save({'LRGCCF':gcn.state_dict()},args.parameters_path + '_' + args.dataset_name + '_' + str(epoch + 1) + '.pth')
                log_datafile=args.log+ '_' + args.dataset_name+ '_' + str(epoch + 1) +'.data'
                with open(log_datafile, 'wb') as faa:
                    pickle.dump(logdata,faa)
    f.close()
    np.savetxt(args.log+ '_' + args.dataset_name +'.csv',logdata,delimiter=',')