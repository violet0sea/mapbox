'use strict'
import React, {Component, PropTypes} from 'react'
import ReactDom from 'react-dom'
import latticeCss from './lattice.css'
import d3 from 'd3'

// require('./lattice.css');

class LatticeItem extends Component {
    constructor(props) {
        super(props);
        let index = props.index,
            select = props.select,
            data = props.data,
            onClick = props.onClick;

        this.state = {
            index :index ,
            select : select,
            data : data,
            onClick : onClick
        }

        //存储 dom 节点
        this.lineContainer = {};
        this.svg = {};
        this.background = {};
        this.textObject = {};
    }

    componentDidMount(){

        let data = this.state.data;
        //初始化
        // /this.setByOption(data);
        // //根据配置参数 渲染组件
        // this.setByOption();
        this.init();


        this.setOption(data);
    }

    //初始化
    init(){
        let that = this;
        let data = this.state.data;
        let select = this.state.select;
        let index = this.state.index;

        //画背景
        paintBackground();
        //设置动画
        setAnimation();



        //设置动画
        function setAnimation(){
            let theDom = ReactDom.findDOMNode(that);

            let theLattice = theDom;

            theLattice.addEventListener('mouseenter',function(){

                let ledges = theLattice.querySelectorAll('.ledge');

                for (var i = 0; i < ledges.length; i++) {
                    ledges[i].style.width = '50%';

                    setWidhtOfObject(ledges[i],500);
                }
            })

            function setWidhtOfObject (object , time){
                setTimeout(function(){
                    object.style.width = '15px';
                },500);
            }
        }
        //画背景
        function paintBackground(){
            let theDom = ReactDom.findDOMNode(that);

            let backgroundPath = data.series[0].backgroundPathStyle;
            let backStyle = backgroundPath.normal;

            let opacity = '0';
            //判断当前是否为选中状态
            if(select){
                opacity = '0.5';
                backStyle = backgroundPath.emphasis;
            }

            let id = '#backLine' + that.state.index;
            let lattice = theDom.querySelector(id);
            let clientWidth = lattice.clientWidth;
            let clientHeight = lattice.clientHeight;

            let svgContainer = d3.select(lattice);

            that.svg = svgContainer;
            let lineLength = 200;
            let length  = 30;
            let averyLength = lineLength/length;
            //存储起来
            let lineContainer = svgContainer.append('g');
            that.lineContainer = lineContainer;
            for (var i = 1; i < length * 10; i++) {
                let leftMargin = i * averyLength + 5;
                let lineArray = [
                    [leftMargin, 0],[leftMargin, lineLength * 10]
                ];
                let line = d3.svg.line();
                //画线
                that.background = lineContainer.append('path');
                that.background.attr("d", line(lineArray))
                            .attr('class','backgroundPath')
                            .style({
                                'stroke' : '#0281b8',
                                'stroke-width' : 2,
                                'fill' : 'none',
                                'opacity' : opacity
                            })
                            .attr("transform", "rotate(-45,"+ 0 +"," + 0 +")" +
                                                "translate(" + (-clientWidth * 5) +
                                                "," + (-clientHeight/2) + ")");

                that.background.style(
                    backStyle
                )
                .attr(backStyle);
            }
        }

    }

    //根据配置参数设置 效果
    setOption(data){
        let that = this;

        //设置文本
        setText();
        //设置文本的样式
        setTextStyle();
        //设置背景
        setBackground();
        //设置边框的样式
        setBorderStyle();
        //设置水平或者竖直
        setOrient();

        //设置当前 标签的宽度
        setWidthOfDom();

        //设置文本
        function setText(){
            let theDom = ReactDom.findDOMNode(that);

            let id = '#text' + that.state.index;
            let index = that.state.index;
            let select = that.state.select;
            let series = data.series;
            let span = data.span;

            let theData = series[index];
            let theText = series[0].data[index]['name'];

            let text = theDom.querySelector(id);
            text.innerHTML = theText;
        }
        //设置文本样式
        function setTextStyle(){
            let id = '#text' + that.state.index;
            let index = that.state.index;
            let select = that.state.select;
            let theData = data.series[0];

            let textStyle = theData.textStyle;

            let text = ReactDom.findDOMNode(that).querySelector(id);

            if(select){
                let emphasis = textStyle.emphasis;
                that.setStyleOfObject(text,emphasis);
            }else{

                let normal = textStyle.normal;
                that.setStyleOfObject(text,normal);
            }
        }
        //设置背景
        function setBackground(){
            let index = that.state.index;
            let select = that.state.select;
            let backgroundPathStyle = data.series[0].backgroundPathStyle;

            let id = '#backLine' + that.state.index;
            let paths = ReactDom.findDOMNode(that).querySelectorAll('path');
            let emphasis = backgroundPathStyle.emphasis;
            let normal = backgroundPathStyle.normal;

            if(select){

                for (var i = 0; i < paths.length; i++) {
                    that.setStyleOfObject(paths[i], emphasis);
                }
            }else{
                for (var i = 0; i < paths.length; i++) {
                    that.setStyleOfObject(paths[i], normal);
                }
            }
        }
        //设置边框的样式
        function setBorderStyle(){
            let index = that.state.index;
            let select = that.state.select;
            let id = '#lattice' + that.state.index;
            let lattice = ReactDom.findDOMNode(that);
            let legals = lattice.querySelectorAll('.ledge');
            let bothSidesStyle = data.series[0].bothSidesStyle;

            if(select){
                let emphasis = bothSidesStyle.emphasis;

                for (var i = 0; i < legals.length; i++) {
                    let childs = legals[i].querySelectorAll('div');
                    for (var k = 0; k < childs.length; k++) {
                        console.log('childs.length', emphasis);
                        that.setStyleOfObject(childs[k], emphasis);
                    }

                    if(legals[i].querySelector('.childLedge')){
                        legals[i].querySelector('.childLedge').style.background = 'transparent';
                    }
                }

            }else{
                let normal = bothSidesStyle.normal;
                for (var i = 0; i < legals.length; i++) {
                    let childs = legals[i].querySelectorAll('div');
                    for (var k = 0; k < childs.length; k++) {
                        that.setStyleOfObject(childs[k], normal);
                    }

                    if(legals[i].querySelector('.childLedge')){
                        legals[i].querySelector('.childLedge').style.background = 'transparent';
                    }
                }
            }
        }

        //设置水平或者竖直
        function setOrient(){
            let theDom = ReactDom.findDOMNode(that);

            let orient = data.orient;
            if(orient == 'vertical'){
                let lattices = theDom.querySelectorAll('.lattice');

                for (var i = 0; i < lattices.length; i++) {
                    lattices[i].style.display = "block";
                    lattices[i].style.margin = '2%';
                }
            }else{
                let lattices = theDom.querySelectorAll('.lattice');

                for (var i = 0; i < lattices.length; i++) {
                    lattices[i].style.display = "inline-block";
                    lattices[i].style.margin = '0 2%';
                }
            }
        }

        //设置当前文本的 宽度
        function setWidthOfDom(){
            let theReactDom = ReactDom.findDOMNode(that);

            let dataLength = that.state.data.series[0].data.length;
            let seriesLength = that.state.data.series[0].data.length;
            let maxNumInOneLine = that.state.data.maxNumInOneLine;

            //获取最小值
            if(maxNumInOneLine < dataLength){
                dataLength = maxNumInOneLine;
            }

            let itemItemWidth = 0 ;
            if(dataLength > 0){
                itemItemWidth = 95/dataLength;
            }

            let averyMargin = 0;
            if( (dataLength - 1) > 0){
                averyMargin = 5 / (dataLength - 1);
            }

            if((that.state.index)%(dataLength) != 0){
                theReactDom.style.marginLeft = averyMargin + '%';
            }else{
                theReactDom.style.marginLeft = 0 + '%';
            }
            theReactDom.style.width = itemItemWidth + '%';

            //设置高度
            let rows = Math.ceil(seriesLength/dataLength);
            let height = 100/rows;
            theReactDom.style.height = height + '%';
            //设置向上的margin
            if(that.state.index > (dataLength - 1) ){
                let theHeight = 5;
                if(rows > 1){
                    theHeight = 5/(rows - 1);
                }

                theReactDom.style.marginTop = theHeight + '%';
            }
        }
    }



    //设置对象的样式
    setStyleOfObject(object, style){
        for (let key in style) {
            object.style[key] = style[key];
        }
    }

    componentWillReceiveProps(props){
        let index = props.index,
            select = props.select,
            data = props.data,
            onClick = props.onClick;

        this.state = {
            index :index ,
            select : select,
            data : data,
            onClick : onClick
        }

        this.setOption(data);
    }

    handleClick() {
        this.props.onClick(this.props.index);
	}

    render(){
        return(
            <div id = { 'lattice' + this.state.index } className = 'lattice' onClick={e => {this.handleClick()}} >
                 <div className = 'latticeContent'>
                    <div className = 'textContent'>
                        <div id = { 'text' + this.state.index }>文本 </div>
                     </div>
                    <div className = 'svgContainer'>
                        <svg id = { 'backLine' + this.state.index }> </svg>
                     </div>
                    <div className = 'lineConatainer' >
                        <div className = 'lineContent' >
                            <div className = 'ledge left'>
                                <div className = 'block'> </div>
                                <div className = 'otherLedeg' style = {{ 'background': 'transparent' }}> </div>
                                <div className = 'childLedge' style = {{ 'background': 'transparent' }}> </div>
                             </div>

                            <div className = 'ledge right'>
                                <div className = 'childLedge'> </div>
                                <div className = 'otherLedeg'> </div>
                                <div className = 'block'> </div>
                            </div>

                        </div>
                     </div>
                  </div>
             </div>
        )
    }
}

export default LatticeItem
