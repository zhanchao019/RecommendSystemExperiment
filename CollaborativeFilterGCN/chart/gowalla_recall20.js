var chart = Highcharts.chart('container', {
	chart: {
		type: 'line'
	},
	title: {
		text: '三种算法召回率对比'
	},
	subtitle: {
		text: 'gowalla'
	},
	xAxis: {
		categories: [1, 101, 201, 301, 401, 501, 601, 701, 801, 901, 1001]
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
		name: 'ngcf_gowalla_recall TOP20',
		data: [0.016347835, 0.098397814, 0.09881687, 0.1001836, 0.1020521, 0.10178377, 0.10297569, 0.10264483, 0.10254988, 0.104114085, 0.102936454]
	},{
		name: 'lightgcn_gowalla_recall TOP20',
		data: [0.05313537, 0.10990865, 0.11525437, 0.11438087, 0.11237313, 0.11112012, 0.10973406, 0.109465644, 0.10902136, 0.10818192, 0.10879567]
	}, {
		name: 'bprmf_gowalla_recall TOP20',
		data: [0.04690565, 0.08849166, 0.092405856, 0.09414518, 0.09366613, 0.096203215, 0.09428924, 0.09491369, 0.09505861, 0.09446454, 0.09536337]
	}]
});

