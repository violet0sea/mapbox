/*
* @Author: 彭虹杰
* @Date:   2016-06-26 10:27:16
* @Last modified by:   haiwang
* @Last modified time: 2017-01-11 16:17:42
* @Path: E:\github\tueasy5\Controls\src\controls\nav\navItem.js
* @Describle:
*/

'use strict';

import React, {Component, PropTypes} from 'react'
import ReactDom from 'react-dom'
import Util from '../util/Util'

class NavItem extends Component {

	constructor(props) {
		super(props)

		this.state = {
			data: this.props.data
		}

	}

	changeStyle() {

		let select = this.props.select,
			data = this.state.data,
			a = data.a,
			width = parseInt(a.width),
			span = Util.clone(data.span),
			style = span.normal, key,
			transformOrigin = '',
			orient = data.orient

		if(select) {

			for(key in span.emphasis) {
				style[key] = span.emphasis[key]
			}
		}

		if(orient == 'vertical') {
			transformOrigin = '50% 50%' + '-' + width / 2 + 'px'
		} else {
			transformOrigin = '50% 0%'
		}

		style.transformOrigin = transformOrigin

		this.spanStyle = style
	}

	changePosition() {

		let data = Util.clone(this.state.data),
			orient = data.orient,
			a = data.a,
			height = parseInt(a.height),
			width = parseInt(a.width),
			top, left,
			index = this.props.index

		if(orient == 'horizontal') {
			top = 0
			left = (index * (width + parseInt(data.itemGap))) + 'px'
		} else {
			left = 0
			top = index * (height + parseInt(data.itemGap)) + 'px'
		}

		a.top = top
		a.left = left

		this.aStyle = a

	}

	addNormal() {
		let data = this.state.data,
			normalSpan = data.span.normal,
			emphaSpan = data.span.emphasis,
			cssObj = {},
			cssText = '',
			sheet = document.styleSheets[0],
			select = this.props.select,
			selector = ReactDom.findDOMNode(this),
			parent = selector.parentNode,
			tempId = parent.getAttribute('tempId'),
			selectorText = '.Nav[tempid="' + tempId + '"] .NavItem.item' + this.props.index + ' span::before'


		if(select) {
			cssObj.background = emphaSpan.background
		} else {
			cssObj.background = normalSpan.background
		}

		cssText = this.createCssText(cssObj)
		this.addRule(sheet, selectorText, cssText)

	}

	createCssText(obj) {

		let cssText = '{',
			key, first = true
		for(key in obj) {
			if(!first) {
				cssText += ';'
			}
			cssText = cssText + key + ':' + obj[key]
			first = false
		}

		cssText += '}'

		return cssText
	}

	addRule(sheet, selectorText, cssText) {

		this.removeRule(sheet, selectorText)
		sheet.insertRule(selectorText + cssText, 0)

	}

	removeRule(sheet, selectorText) {
		const rules = sheet.rules

		let i = 0, len, rule

		for(i = 0, len = rules.length; i < len; i++) {
			rule = rules[i]


			if(rule.selectorText == selectorText) {

				sheet.removeRule(i)
				len--
			}
		}

	}

	componentDidMount() {

		setTimeout(() => this.addNormal(), 0)

	}

	componentWillReceiveProps(newProps) {

		this.setState({
			data: newProps.data
		})
	}

	componentDidUpdate() {
		setTimeout(() => this.addNormal(), 0)
	}

	handleClick() {

		this.props.onClick(this.props.index)
	}

	render() {

		const data = this.state.data

		this.changeStyle()
		this.changePosition()

		return (
			<a className={"NavItem item" + this.props.index} style={this.aStyle} onClick={e => {this.handleClick()}}>
				<span data-hover={this.props.children} style={this.spanStyle}>{this.props.children}</span>
			</a>
			)
	}
}

export default NavItem
