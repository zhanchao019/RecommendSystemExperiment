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
		name: 'ngcf_gowalla_ndcg TOP10',
		data: [0.016744558, 0.10119898, 0.102479935, 0.104211055, 0.10665003, 0.10621135, 0.10654442, 0.106958985, 0.10698137, 0.10785606, 0.10778848]},{
			name: 'lightgcn_gowalla_ndcg TOP10',
			data: [0.05366331, 0.10844049, 0.1149618, 0.114172556, 0.11396899, 0.112997256, 0.111715406, 0.11209896, 0.11181076, 0.11143555, 0.11156893]}, {
				name: 'bprmf_gowalla_ndcg TOP10',
				data: [0.044266034, 0.092652254, 0.09788345, 0.098033175, 0.09854762, 0.10036265, 0.09841372, 0.098666094, 0.09867458, 0.09914931, 0.10041072]}]
});

