/*
* @Author: FunctionRun
* @Date:   2017-01-10 10:15:25
* @Last modified by:   haiwang
* @Last modified time: 2017-01-11 18:06:32
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/GitHub/FEscaffold/index.js
* @File Name: index.js
* @Descript:
*/

'use strict';



import React from 'react';
import ReactDOM from 'react-dom';
import NavWrap from './public/navWrap/index';
import './public/css/reset.css';
import './public/css/index.css';
import data from './public/util/result.json';
console.log('________', data);

const mapContainer = document.querySelector('.mapboxContainer');
ReactDOM.render(<NavWrap />, mapContainer);
mapboxgl.accessToken = 'pk.eyJ1IjoidmlvbGV0MHNlYSIsImEiOiJjaXhzY2p1OG8wNDA5MzJsOTViZDU5YTU2In0.OA2_JtTmQbVEvy_BGseViA'; // need accessToken here
const map = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [117.1888, 39.1175],
    zoom: 13
});
map.flyTo({
    curve: 1.42
})
map.on('load', () => {
    let count = 0;
    window.setInterval(addPoint, 100);

    function addPoint() {
        map.removeLayer('cluster-1');
        map.removeLayer('cluster-2')
        map.addSource("zhangshui" + count, {
            "type": "geojson",           /* geojson类型资源 */
            "data": {                    /* geojson数据 */
                "type": "FeatureCollection",
                "features": data.tuishui[count % 144]
            },
            cluster: true,
            clusterMaxZoom: 20, // Max zoom to cluster points on
            clusterRadius: 10 // Use small cluster radius for the heatmap look
        });

        map.addSource("tuishui" + count, {
            "type": "geojson",           /* geojson类型资源 */
            "data": {                    /* geojson数据 */
                "type": "FeatureCollection",
                "features": data.zhanghui[count % 144]
            },
            cluster: true,
            clusterMaxZoom: 15, // Max zoom to cluster points on
            clusterRadius: 20 // Use small cluster radius for the heatmap look
        });
        map.addLayer({
            "id": "cluster-1",
            "type": "circle",
            "source": "zhangshui" + count,
            "paint": {
                "circle-color": 'rgba(0, 255, 0, 0.5)',
                "circle-radius": 40,
                "circle-blur": 1 // blur the circles to get a heatmap look
            },
             "filter": ["==", "$type", "Point"],
        }, 'waterway-label');
        map.addLayer({
            "id": "cluster-2",
            "type": "circle",
            "source": "tuishui" + count,
            "paint": {
                "circle-color": 'rgba(255, 0, 0, 0.5)',
                "circle-radius": 20,
                "circle-blur": 1 // blur the circles to get a heatmap look
            },
             "filter": ["==", "$type", "Point"],
        }, 'waterway-label');

        count++;
        console.log(map)
        debugger

    }


})
