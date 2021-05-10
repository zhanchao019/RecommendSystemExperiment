var chart = Highcharts.chart('container', {
	chart: {
		type: 'line'
	},
	title: {
		text: '三种算法归一化折损累计增益对比'
	},
	subtitle: {
		text: 'AmazonBook'
	},
	xAxis: {
		categories: [1, 51, 101, 151, 201, 251, 301, 351, 401, 451, 501]
	},
	yAxis: {
		title: {
			text: 'ndcg rate'
		}
	},
	plotOptions: {
		line: {
			dataLabels: {
				// 开启数据标签
				enabled: false          
			},
			// 关闭鼠标跟踪，对应的提示框、点击事件会失效
			enableMouseTracking: false
		}
	},
	series: [{
		name: 'ngcf_amazon_ndcg TOP20',
		data: [0.014047995, 0.029256945, 0.03153166, 0.032778464, 0.03327607, 0.033743415, 0.034562234, 0.034553036, 0.034795757, 0.03510416, 0.035049256]
	},{
		name: 'lightgcn_amazon_ndcg TOP20',
		data:[0.009749765, 0.027678099, 0.031070143, 0.03291574, 0.034010462, 0.034721248, 0.035153445, 0.035595957, 0.03577376, 0.036098935, 0.03641436]}, {
			name: 'bprmf_amazon_ndcg TOP20',
			data: [0.011526981, 0.027955104, 0.029786706, 0.030502712, 0.030785285, 0.031032944, 0.031771123, 0.0313069, 0.03183616, 0.031989954, 0.03160389]
		}]
});

