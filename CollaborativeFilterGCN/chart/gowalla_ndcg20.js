var chart = Highcharts.chart('container', {
	chart: {
		type: 'line'
	},
	title: {
		text: '三种算法归一化折损累计增益对比'
	},
	subtitle: {
		text: 'gowalla'
	},
	xAxis: {
		categories: [1, 101, 201, 301, 401, 501, 601, 701, 801, 901, 1001]
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
		name: 'ngcf_gowalla_ndcg TOP20',
		data: [0.02992013, 0.14718975, 0.15060176, 0.15240127, 0.15534963, 0.1550788, 0.15522783, 0.15637653, 0.15624604, 0.15862435, 0.15794675]},{
			name: 'lightgcn_gowalla_ndcg TOP20',
			data: [0.07856752, 0.15370718, 0.16258575, 0.16316094, 0.16271263, 0.16245887, 0.16183269, 0.16161838, 0.16179477, 0.16106303, 0.16109282]}, {
				name: 'bprmf_gowalla_ndcg TOP20',
				data: [0.06488789, 0.13790703, 0.14390875, 0.14436905, 0.1457001, 0.14704181, 0.14527325, 0.1454317, 0.14533567, 0.14593735, 0.14742117]}]
});

