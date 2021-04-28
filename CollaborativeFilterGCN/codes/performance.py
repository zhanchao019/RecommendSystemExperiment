import math
import torch
import numpy as np
import multiprocessing as mp
from utility.decorate import logger
from utility.metrics import recall_k, ndcg_k
from tqdm import tqdm
#

def evaluate(user_emb, item_emb, n_users, n_items, train_U2I, test_U2I, args):
    scores = np.matmul(user_emb, item_emb.T)
    #print('1')
    perf_info = performance_speed(scores, train_U2I, test_U2I, args)
    #print('2')
    perf_info = np.mean(perf_info, axis=0)
    #print('3')

    return perf_info


def _init(_scores, _train_U2I, _test_U2I, _topks):
    global scores, train_user_item, test_user_item, topks
    scores = _scores
    train_user_item = _train_U2I
    test_user_item = _test_U2I
    topks = _topks


def performance_speed(scores, train_U2I, test_U2I, args):
    topks = eval(args.topks)
    #print("1.1")
    test_user_set = list(test_U2I.keys())
    #print("1.2")
    perf_info = np.zeros((len(test_user_set), 2 * len(topks)), dtype=np.float32)
    #print("1.3")
    test_parameters = zip(test_user_set, )
    #print("1.3.1")
    #print(scores.shape)
    print(len(train_U2I))
    print(len(test_U2I))
    root = '/home/ubuntu/RecommendSystemExperiment/CollaborativeFilterGCN'


    #global scores, train_user_item, test_user_item, topks
    #with mp.Pool(processes=args.cores, initializer=_init, initargs=(scores, train_U2I, test_U2I, topks,)) as pool:
    #    all_perf = pool.map(test_one_perf, test_parameters)

    result=[]
    for i in tqdm(test_parameters):
        #print(i.shape())
        tmp=test_one_perf(i,scores,train_U2I,test_U2I,topks)
        result.append(tmp)

    #print("1.4")
    for i, one_perf in tqdm(enumerate(result)):
        perf_info[i] = one_perf
    #print("1.5")
    return perf_info


def test_one_perf(X,scores,train_user_item, test_user_item,topks):
    u_id = X[0]
    score = scores[u_id]
    uid_train_pos_items = list(train_user_item[u_id])
    uid_test_pos_items = list(test_user_item[u_id])

    score[uid_train_pos_items] = -np.inf
    score_indices = largest_indices(score, topks)
    result = get_perf(score_indices, uid_test_pos_items, topks)

    return result


def largest_indices(score, topks):
    max_topk = max(topks)
    indices = np.argpartition(score, -max_topk)[-max_topk:]
    indices = indices[np.argsort(-score[indices])]
    return indices


def get_perf(rank, uid_test_pos_items, topks):
    topk_eval = np.zeros(2 * len(topks), dtype=np.float32)
    for i, topk in enumerate(topks):
        topk_eval[i * 2 + 0] = recall_k(rank[:topk], uid_test_pos_items)
        topk_eval[i * 2 + 1] = ndcg_k(rank[:topk], uid_test_pos_items)

    return topk_eval

