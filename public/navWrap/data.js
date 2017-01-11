/**
* @Author: haiwang
* @Date:   2017-01-11 15:39:38
* @Email:  violet0sea@163.com
* @Last modified by:   haiwang
* @Last modified time: 2017-01-11 16:28:18
*/



const data = {
	"currentSelect": 0,
	"automatic": {
		"start": false,
		"interval": 2000
	},
	"maxNumInOneLine" : 100,
	"animation" : {
		"showAnimation" : true,
		"animationType" : "lattice",
		"animationDelay" : 1000
	},
	"orient": "horizontal",
	"series": [{
		"type" : 'lattice',
		"data" : [
			{
				"key": "create",
				"name": "创业",
			},
			{
				"key": "map",
				"name": "地图",
			},
			{
				"key": "police",
				"name": "交警",
			},
			{
				"key": "managerPolice",
				"name": "城管",
			},
			{
				"key": "fire",
				"name": "消防",
			}
		],
		"textStyle": {
			"normal": {
				"fontSize": "18px",
				"color": "#ffa84e",
			},
			"emphasis": {
				"fontSize": "18px",
				"color": "#ffa84e",
			}
		},
		"backgroundPathStyle": {
			"normal": {
				"color" : '#ffe3c6',
				"stroke": "#ffe3c6",
				'opacity' : 0
			},
			"emphasis": {
				"stroke": "#ffe3c6",
				'opacity' : 1
			}
		},
		"bothSidesStyle" : {
			"normal" : {
				"borderColor": "#ffd3a6",
				"background": "#ffd3a6",
			},
			"emphasis": {
				"borderColor": "#f6eb3f",
				"background": "#f6eb3f",
			}
		}
	}],
	"itemGap": "24",
	"a": {

	}
}

export default data;
