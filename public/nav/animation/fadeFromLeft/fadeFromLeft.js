'use strict'
import React, {Component, PropTypes} from 'react'
import ReactDom from 'react-dom'
require('./fadeFromLeft.css')

class FadeFromLeft extends Component{
    constructor(props) {
        super(props);

        let index = props.index,
            select = props.select,
            data = props.data,
            onClick = props.onClick;

        let series = data.series;

        let theData = series[index];
        let theText = theData['name'];
        let key = theData['key'];

        this.state = {
            index :index ,
            select : select,
            data : data,
            onClick : onClick,
            theText : theText
        }


    }

    componentDidMount(){
        let that = this;
        //初始化
        init();
        function init(){
            let backgrounds = document.querySelectorAll('.background');
            let texts = document.querySelectorAll('.text');

            let data = that.state.data;
            let select = that.state.select;
            let index = that.state.index;

            let spanNormal =  data.span.normal;
            let spanEmphasis = data.span.emphasis;

            for (var i = 0; i < texts.length; i++) {
                if(index == i){
                    backgrounds[i].classList.add("backgroundHoverClick");
                    texts[i].classList.add("textSelected");
                    // setStyleOfObject(texts[i],spanEmphasis);
                }else{
                    backgrounds[i].classList.remove("backgroundHoverClick");
                    texts[i].classList.remove("textSelected");
                    //setStyleOfObject(texts[i],spanNormal);
                }
            }
        }

        //设置当前 标签的宽度
        setWidthOfDom();

        function setWidthOfDom(){
            let reactDom =  document.querySelectorAll('.fadeContainer');
            let dataLength = that.state.data.series.length;
            let itemItemWidth = 0 ;
            if(dataLength > 0){
                itemItemWidth = 90/dataLength;
            }

            for (var i = 0; i < reactDom.length; i++) {
                reactDom[i].style.width = itemItemWidth + '%';
            }
        }
        //监听子元素的
        let theFadeContainer = ReactDom.findDOMNode(this).querySelector('.textContainer');
        let theBackground = ReactDom.findDOMNode(this).querySelector('.background');

        theFadeContainer.addEventListener('mouseover',function(){
            theBackground.classList.add("backgroundHover");
        });

        theFadeContainer.addEventListener('mouseout',function(){
            theBackground.classList.remove("backgroundHover");
        });
    }

    handleClick() {
        //判断 是否 选中当前的标签
        let dom = ReactDom.findDOMNode(this);
        let backgrounds = document.querySelectorAll('.background');
        let texts = document.querySelectorAll('.text');

        let data = this.state.data;
        let select = this.state.select;
        let index = this.state.index;

        let spanNormal =  data.span.normal;
        let spanEmphasis = data.span.emphasis;

        for (var i = 0; i < texts.length; i++) {
            if(index == i){
                backgrounds[i].classList.add("backgroundHoverClick");
                texts[i].classList.add("textSelected");
                // setStyleOfObject(texts[i],spanEmphasis);
            }else{
                backgrounds[i].classList.remove("backgroundHoverClick");
                texts[i].classList.remove("textSelected");
                //setStyleOfObject(texts[i],spanNormal);
            }
        }

		this.props.onClick(this.props.index)
	}

    render(){
        return(
            <div id = 'fadeFromLeft' className = 'fadeContainer'>
                <div className = 'backgroundContainer'>
                    <div className = 'background theAnimation'> </div>
                 </div>
                <div className = 'textContainer' >
                    <div className = 'text' onClick={e => {this.handleClick()}}>
                        { this.state.theText }
                    </div>
                 </div>
             </div>
        )
    }
}

export default FadeFromLeft
