/*
* @Author: 彭虹杰
* @Date:   2016-06-26 10:05:49
* @Last modified by:   haiwang
* @Last modified time: 2017-01-11 16:34:51
* @Path: E:\github\tueasy5\Controls\src\controls\nav\index.js
* @Describle:
*/

'use strict';

import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import NavCss from './nav.css'
import NavItem from './navItem'
import Util from '../util/Util'
import LatticeItem from './animation/lattice'
import FadeInItem from './animation/fadeIn/fadeIn.js'
import FadeOblique from './animation/fadeOblique/fadeOblique.js'
import FadeFromTop from './animation/fadeFromTop/fadeFromTop.js'
import FadeFromLeft from './animation/fadeFromLeft/fadeFromLeft.js'
import FadeFromCenterInVertical from './animation/fadeFromCenterInVertical/fadeFromCenterInVertical.js'
import FadeFromCenterHorizontal from './animation/fadeFromCenterHorizontal/fadeFromCenterHorizontal.js'
import WithTriangle from './animation/withTriangle/withTriangle.js'

class Nav extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: this.props.data
		}
		this.timer = null;

	}

	componentDidMount() {

		const data = this.state.data
		const newState = this.getSize(data)

		this.addSign()

		this.setState({
			data: newState
		})

 		this.automatic();
		/****新 添加的*****/
			// let theFadeContainer = document.querySelectorAll('.fadeContainer')
			//  ;
		/****新 添加的*****/
	}
	componentDidUpdate() {
        this.automatic();

    }
    componentWillUnmount() {

    	if(this.timer) {
    		clearInterval(this.timer);
    		this.timer = null;
    	}
    }
 	automatic() {

 		if(this.timer) {
 			return false;
 		}

 		const container = ReactDom.findDOMNode(this);
        const state = this.state;
        const itemLength = state.data.series[0].data.length;
        const automatic =  state.data.automatic;

        let count = 0;
        if(!automatic || !automatic.start) {
            return false;
        }

		this.timer = setInterval(() => {
			const itemList = container.children;
			[...itemList][count%itemLength].click();
			count++;
		}, automatic.interval || 1000)


    }
	addSign() {

		let selector = ReactDom.findDOMNode(this),
			tempStr = new Date().getTime()

		selector.setAttribute('tempId', tempStr)

	}

	getSize(data, isResize) {

		let newState = Util.clone(data),
			orient = newState.orient,
			itemGap = parseInt(newState.itemGap),
			len = newState.series[0].data.length,
			lineHeight, aWidth, aHeight,
			padding, cWidth,
			cHeight, aStyle = newState.a,
			selector = ReactDom.findDOMNode(this)

		let container = selector.parentNode,
			containerStyle = getComputedStyle(container, null)

		cWidth = parseInt(containerStyle.width)
		cHeight = parseInt(containerStyle.height)

		newState.width = cWidth
		newState.height = cHeight

		if(typeof aStyle == 'undefined'
			|| isResize
			|| this.orient != newState.orient
			|| this.itemGap != newState.itemGap) {
			if(orient == 'horizontal') {
				aHeight = cHeight + 'px'
				aWidth = (cWidth - (len - 1) * itemGap) / len + 'px'

			} else {
				aWidth = cWidth + 'px'
				aHeight = (cHeight - (len - 1) * itemGap) / len + 'px'
			}

			lineHeight = aHeight

			newState.a = {
				width: aWidth,
				height: aHeight,
				lineHeight: lineHeight
			}
		} else {

			if(orient == 'horizontal') {
				if(aStyle.width){
					itemGap = (cWidth - (parseInt(aStyle.width) * len)) / (len - 1)
				}
			} else {
				if(aStyle.height){
					itemGap = (cHeight - parseInt(aStyle.height) * len) / (len - 1)
				}
			}
			newState.itemGap = itemGap
		}

		this.orient = orient
		this.itemGap = itemGap

		return newState

	}

	componentWillReceiveProps(newProps) {
		let data = newProps['data'],
			newState = {}

		newState = this.getSize(data)
		if(this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
		this.setState({
			data: newState
		})
	}

	handleClick(index) {
		let newState = Util.clone(this.state.data),
			selectValue = {}
		newState.currentSelect = index

		this.props.onChange(newState.series[0].data[index])
		this.setState({
			data: newState
		})
	}

	renderItem() {
		let that = this;
		let data = this.state.data,
		    NavItems = [],
		    series = data.series,
			type = data.series[0].type,
			seriesData = series[0].data;
			// theSeries = data.theSeries;

			// animationType = data.animation.animationType

		// //数据
		// let itemsData = [];
		// for (var i = 0; i < theSeries.length; i++) {
		// 	itemsData = itemsData.concat(theSeries[i].data);
		// }
		//@TODO
		/***新添加的***/
		let animationObject = {
			'3d' : function(){
				/***新添加的****/
				let animationNavItems = seriesData.map((item, index) => <NavItem onClick={value => {
					that.handleClick(value)
				}} key={'nav' + index} index={index} select={index==data.currentSelect} data={data} >{item.name}</NavItem>
				)

				return animationNavItems;
			},
			'lattice' : function(){
				/***新添加的****/
				let animationNavItems = seriesData.map((item, index) => <LatticeItem onClick={value => {
					that.handleClick(value)
				}} key={'nav' + index} index={index} select={index==data.currentSelect} data={data} >{item.name}</LatticeItem>
				)

				return animationNavItems;
			},
			'fadeIn' :  function(){
				/***新添加的****/
				let animationNavItems = seriesData.map((item, index) => <FadeInItem onClick={value => {
					that.handleClick(value)
				}} key={'nav' + index} index={index} select={index==data.currentSelect} data={data} >{item.name}</FadeInItem>
				)

				return animationNavItems;
			},
			'fadeOblique' : function(){
				/***新添加的****/
				let animationNavItems = seriesData.map((item, index) => <FadeOblique onClick={value => {
					that.handleClick(value)
				}} key={'nav' + index} index={index} select={index==data.currentSelect} data={data} >{item.name}</FadeOblique>
				)

				return animationNavItems;
			},
			'fadeFromTop' : function(){
				/***新添加的****/
				let animationNavItems = seriesData.map((item, index) => <FadeFromTop onClick={value => {
					that.handleClick(value)
				}} key={'nav' + index} index={index} select={index==data.currentSelect} data={data} >{item.name}</FadeFromTop>
				)

				return animationNavItems;
			},
			'fadeFromLeft' : function(){
				/***新添加的****/
				let animationNavItems = seriesData.map((item, index) => <FadeFromLeft onClick={value => {
					that.handleClick(value)
				}} key={'nav' + index} index={index} select={index==data.currentSelect} data={data} >{item.name}</FadeFromLeft>
				)

				return animationNavItems;
			},
			'fadeFromCenterInVertical' : function(){
				/***新添加的****/
				let animationNavItems = seriesData.map((item, index) => <FadeFromCenterInVertical onClick={value => {
					that.handleClick(value)
				}} key={'nav' + index} index={index} select={index==data.currentSelect} data={data} >{item.name}</FadeFromCenterInVertical>
				)

				return animationNavItems;
			},
			'fadeFromCenterHorizontal' : function(){
				/***新添加的****/
				let animationNavItems = seriesData.map((item, index) => <FadeFromCenterHorizontal onClick={value => {
					that.handleClick(value)
				}} key={'nav' + index} index={index} select={index==data.currentSelect} data={data} >{item.name}</FadeFromCenterHorizontal>
				)

				return animationNavItems;
			},
			'withTriangle' : function(){
				/***新添加的****/
				let animationNavItems = seriesData.map((item, index) => <WithTriangle onClick={value => {
					that.handleClick(value)
				}} key={'nav' + index} index={index} select={index==data.currentSelect} defaultCurrentSelect = { data.currentSelect } data={data} >{item.name}</WithTriangle>
				)

				return animationNavItems;
			}


		}
		NavItems = animationObject[type]();

		return NavItems
	}

	render() {
		let className = 'Nav',
			data = this.state.data,
			width = data.width

		if(typeof width == 'undefined') {
			return <div></div>
		}
		if(data.orient == 'horizontal') {
			className += ' horizontal'
		} else {
			className += ' vertical'
		}

		return (
			<div className={className} style = {{ height: '80px' }}>{this.renderItem()}</div>
			)
	}
}

export default Nav
