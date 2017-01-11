/**
* @Author: haiwang
* @Date:   2017-01-11 14:58:43
* @Email:  violet0sea@163.com
* @Last modified by:   haiwang
* @Last modified time: 2017-01-11 16:01:00
* @Description: 根据tianjin.json里的数据转化成需要的数据格式
*/



const rf = require('fs');
const data = JSON.parse(rf.readFileSync('./tianjin.json', 'utf-8'));

let returnValue = {};
returnValue['timeList'] = [];

for(let key in data) {

    let item = data[key];
    let r1 = [];
    let flag = returnValue['timeList'].length === 0;

    item[0].timeList.forEach(((d, i) => {

        if(flag) {

            returnValue['timeList'].push({
                key: 'item' + i,
                name: d
            });

        }
        let arr = [];
        item[0].data.forEach(item => {

            if(item.value[i] != '0.0') {

                arr.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [item.x, item.y]
                    }
                });
            }

        });

        r1.push(arr);

    }));

    returnValue[key] = r1;


}

rf.writeFile('result.json', JSON.stringify(returnValue))
