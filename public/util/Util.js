/*
* @Author: 彭虹杰
* @Date:   2016-06-18 15:55:56
* @Last Modified by:   xiaoer
* @Last Modified time: 2016-06-18 16:48:13
* @Path: E:\github\Controls\src\Util\Util.js
* @Describle:
*/

'use strict';

const Util = {
	clone(myObj) {

		if (typeof(myObj) != 'object') {

			return myObj
		}

		if (myObj == null) {

			return myObj
		}

		var myNewObj = new Object();

		if (myObj instanceof Array) {

			var newArray = [],
				i

			for (i = 0; i < myObj.length; i++) {

				newArray.push(this.clone(myObj[i]))
			}

			return newArray
		}

		if (myObj instanceof Function) {

			return myObj
		}

		for (var i in myObj) {

			myNewObj[i] = this.clone(myObj[i])

		}

		return myNewObj;
	},
	getSum() {
		var a = arguments[0],
			sum = 0

		for(var i = 0, len = a.length; i < len; i++) {
			sum += parseFloat(a[i])
		}

		return sum
	},
	appendStyle: function(msg, id) {

		if (document.querySelector('#' + id)) {

			document.querySelector('#' + id).innerHTML = msg
		} else {
			var style = document.createElement('style')
			style.id = id
			style.innerHTML = msg

			document.querySelector('head').appendChild(style)
		}
	}
}

export default Util
