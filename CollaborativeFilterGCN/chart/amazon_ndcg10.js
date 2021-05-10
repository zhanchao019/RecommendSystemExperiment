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
		name: 'ngcf_amazon_ndcg TOP10',
		data: [0.007995955, 0.01606931, 0.017593881, 0.018535273, 0.018546516, 0.01875447, 0.019584933, 0.019481754, 0.019581575, 0.019802576, 0.01971219]
	},{
		name: 'lightgcn_amazon_ndcg TOP10',
		data:[0.005173107, 0.015760457, 0.017855534, 0.01894744, 0.019458292, 0.01983406, 0.020187039, 0.020270785, 0.0204937, 0.02057679, 0.020532418]
	}, {
		name: 'bprmf_amazon_ndcg TOP10',
		data: [0.006507495, 0.015987474, 0.01668368, 0.017203074, 0.017491544, 0.017330574, 0.017913986, 0.017865263, 0.017991535, 0.017985918, 0.017868191]
	}]
});

