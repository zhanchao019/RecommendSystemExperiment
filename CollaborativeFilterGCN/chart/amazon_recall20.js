var chart = Highcharts.chart('container', {
	chart: {
		type: 'line'
	},
	title: {
		text: '三种算法召回率对比'
	},
	subtitle: {
		text: 'AmazonBook'
	},
	xAxis: {
		categories: [1, 51, 101, 151, 201, 251, 301, 351, 401, 451, 501]
	},
	yAxis: {
		title: {
			text: 'recall rate'
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
		name: 'ngcf_amazon_recall TOP20',
		data: [0.00789156, 0.015145361, 0.016497817, 0.017358858, 0.017389495, 0.017442465, 0.018147763, 0.01798699, 0.018210867, 0.018304177, 0.01841879]
	},{
		name: 'lightgcn_amazon_recall TOP20',
		data:[0.004998208, 0.01496611, 0.016717268, 0.017879158, 0.018447818, 0.018776383, 0.01902501, 0.019053748, 0.019191192, 0.019318813, 0.01912921]
	}, {
		name: 'bprmf_amazon_recall TOP20',
		data: [0.0064403447, 0.015149103, 0.015729496, 0.015825197, 0.016532775, 0.0161316, 0.016688358, 0.01677267, 0.016658042, 0.01702182, 0.016725685]
	}]
});

