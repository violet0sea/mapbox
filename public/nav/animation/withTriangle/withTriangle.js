'use strict'
import React, {Component, PropTypes} from 'react'
import ReactDom from 'react-dom'
require('./withTriangle.css')

class WithTriangle extends Component{
    constructor(props) {
        super(props);
        let index = props.index,
            select = props.select,
            data = props.data,
            currentSelect = props.defaultCurrentSelect,
            onClick = props.onClick;

        let series = data.series;

        let theData = series[index];

        let theText = series[0].data[index]['name'];
        let key = series[0].data[index]['key'];
        this.state = {
            currentSelect : currentSelect,
            index :index ,
            select : select,
            data : data,
            onClick : onClick,
            theText : theText,
            backgroundStyle : {},
            textStyle : {},
            triangleStyle : {}
        }
    }

    componentWillMount(){
        let select = this.state.select;
        let index = this.state.index
        let currentSelect = this.state.currentSelect
        let data = this.state.data;
        let backgroundStyleNormal =  data.series[0].backgroundStyle.normal || {};
        let backgroundStyleEmphasis =  data.series[0].backgroundStyle.emphasis || {};
        let textStyleNormal = data.series[0].textStyle.normal || {};
        let textStyleEmphasis = data.series[0].textStyle.emphasis || {};
        let tiangleStyleNormal =  data.series[0].tiangleStyle.normal || {};
        let tiangleStyleEmphasis =  data.series[0].tiangleStyle.emphasis || {};

        if(!select){
            this.setState({
                'backgroundStyle': backgroundStyleNormal,
                'triangleStyle' : tiangleStyleNormal,
                'textStyle' : textStyleNormal
            })
            // this.state.backgroundStyle = backgroundStyleNormal
        }else{
            this.setState({
                'backgroundStyle': backgroundStyleEmphasis,
                'triangleStyle' : tiangleStyleEmphasis,
                'textStyle' : textStyleEmphasis
            })
        }
    }

    componentDidMount(){
        let that = this;
        let theReact = ReactDom;

        //监听子元素的
        let theFadeContainer = ReactDom.findDOMNode(this).querySelector('.textContainer');
        let theBackground = ReactDom.findDOMNode(this).querySelector('.background');

        theFadeContainer.addEventListener('mouseover',function(){
            theBackground.classList.add("backgroundHover");
        });

        theFadeContainer.addEventListener('mouseout',function(){
            theBackground.classList.remove("backgroundHover");
        });

        //初始化
        init();
        function init(){
            let backgrounds = document.querySelectorAll('.background');
            let texts = document.querySelectorAll('.text');

            let data = that.state.data;
            let select = that.state.select;
            let index = that.state.index;

            // let spanNormal =  data.span.normal;
            // let spanEmphasis = data.span.emphasis;

            //设置当前 标签的宽度
            that.setWidthOfDom();

        }

    }
    //设置对象的样式
    setStyleOfObject(object, style){
        for (let key in style) {
            object.style[key] = style[key];
        }
    }

    setWidthOfDom(){
        let theReactDom = ReactDom.findDOMNode(this);
        let dataLength = this.state.data.series[0].data.length;
        let seriesLength = this.state.data.series[0].data.length;
        let itemGap = this.state.data.itemGap

        let maxNumInOneLine = this.state.data.maxNumInOneLine;
        //获取最小值
        if(maxNumInOneLine < dataLength){
            dataLength = maxNumInOneLine;
        }

        let itemItemWidth = 0 ;

        if(!itemGap){
            //不设置 itemGap 按照10:90 的比例
            if(dataLength > 0){
                itemItemWidth = 90/dataLength;
            }

            let averyMargin = 0;
            if( (dataLength - 1) > 0){
                averyMargin = 10 / (dataLength - 1);
            }

            if((this.state.index)%(dataLength) != 0){
                theReactDom.style.marginLeft = averyMargin + '%';
            }else{
                theReactDom.style.marginLeft = 0 + '%';
            }

            theReactDom.style.width = itemItemWidth + '%';
        }else{
            let averyWidth = itemGap * ( dataLength - 1);
            if(dataLength > 0){
                // console.log('width11', 'calc( (100% -' + averyWidth +  '/(' + dataLength+ '))');
                itemItemWidth = 'calc( ((100%  - ' + averyWidth + 'px)' + '/(' +( dataLength)+ '))';
            }


            if((this.state.index)%(dataLength) != 0){
                theReactDom.style.marginLeft = itemGap + 'px';
            }else{
                theReactDom.style.marginLeft = 0 + '%';
            }

            theReactDom.style.width = itemItemWidth;
        }


        //设置高度
        let height = 90/(Math.ceil(seriesLength/dataLength));
        theReactDom.style.height = height + '%';

        if(Math.ceil(seriesLength/dataLength) == 1){
            let height = 100/(Math.ceil(seriesLength/dataLength));
            theReactDom.style.height = height + '%';
        }


        let parentNodeHeight = 0.1 * theReactDom.parentNode.clientHeight;

        if(this.state.index > (dataLength - 1) ){
            theReactDom.style.marginTop = parentNodeHeight/Math.ceil(seriesLength/(maxNumInOneLine)  - 1) + 'px';
        }

    }

    handleClick() {
        //判断 是否 选中当前的标签
        let dom = ReactDom.findDOMNode(this).parentNode;
        let backgrounds = ReactDom.findDOMNode(dom).querySelectorAll('.background');
        let texts = ReactDom.findDOMNode(dom).querySelectorAll('.text');
        let tritangle = ReactDom.findDOMNode(dom).querySelectorAll('.tritangleContainer');

        let data = this.state.data;
        let select = this.state.select;
        let index = this.state.index;

        let spanNormal =  data.series[0].borderStyle.normal;
        let spanEmphasis = data.series[0].emphasis;

        let backgroundStyleNormal =  data.series[0].backgroundStyle.normal;
        let backgroundStyleEmphasis =  data.series[0].backgroundStyle.emphasis;

        let textStyleStyleNormal =  data.series[0].textStyle.normal;
        let textStyleStyleEmphasis =  data.series[0].textStyle.emphasis;

        let tiangleStyleNormal =  data.series[0].tiangleStyle.normal || {};
        let tiangleStyleEmphasis =  data.series[0].tiangleStyle.emphasis || {};

        for (var i = 0; i < backgrounds.length; i++) {
            // console.log('sdfsdf',backgroundStyleEmphasis);
            if(i == index){
                texts[i].classList.add("textSelected");
                tritangle[i].classList.remove("hide");
                this.setStyleOfObject(backgrounds[i],backgroundStyleEmphasis);
                this.setStyleOfObject(texts[i],textStyleStyleEmphasis);

                this.setState({
                    'textStyle' : textStyleStyleEmphasis,
                })
            }else{
                // backgrounds[i].classList.remove("backgroundHoverClick");
                texts[i].classList.remove("textSelected");
                tritangle[i].classList.add("hide");
                this.setStyleOfObject(backgrounds[i],backgroundStyleNormal);
                this.setStyleOfObject(texts[i],textStyleStyleNormal);

                this.setState({
                    'textStyle' : textStyleStyleNormal,
                })
            }
        }

		this.props.onClick(this.props.index)
	}


    componentWillReceiveProps(props){
        // console.log('willReceiverMount');
        let index = props.index,
            select = props.select,
            data = props.data,
            onClick = props.onClick;

        let series = data.series;
        let theData = series[index];
        let theText = series[0].data[index]['name'];
        let key = series[0].data[index]['key'];
        let backgroundStyleNormal =  data.series[0].backgroundStyle.normal || {};
        let backgroundStyleEmphasis =  data.series[0].backgroundStyle.emphasis || {};
        let textStyleNormal = data.series[0].textStyle.normal
        let textStyleEmphasis = data.series[0].textStyle.emphasis


        if(this.timer) {
            clearInterval(this.timer);
        }
        this.setState({
            index :index ,
            select : select,
            data : data,
            onClick : onClick,
            theText : theText
        })

        // console.log('seleleleleeelel ');
        if(!select){
            this.setState({
                'backgroundStyle': backgroundStyleNormal,
                'textStyle' : textStyleNormal
            })
            // this.state.backgroundStyle = backgroundStyleNormal
        }else{
            this.setState({
                'backgroundStyle': backgroundStyleEmphasis,
                'textStyle' : textStyleEmphasis
            })
        }
        //设置当前 标签的宽度
        this.setWidthOfDom();
    }

    mouseOVerHandle(){
        let data = this.state.data;
        let index = this.state.index
        let select = this.state.select
        let backgroundStyleNormal =  data.series[0].backgroundStyle.normal;
        let backgroundStyleEmphasis =  data.series[0].backgroundStyle.emphasis;
        let textStyleNormal = data.series[0].textStyle.normal
        let textStyleEmphasis = data.series[0].textStyle.emphasis
        this.setState({
            'backgroundStyle' : backgroundStyleEmphasis,
            'textStyle' : textStyleEmphasis,
        })

        let text = ReactDom.findDOMNode(this).querySelector('.text');
        this.setStyleOfObject(text,textStyleEmphasis);
    }

    onMouseLeave(){
        let data = this.state.data;
        let index = this.state.index
        let backgroundStyleNormal =  data.series[0].backgroundStyle.normal;
        let backgroundStyleEmphasis =  data.series[0].backgroundStyle.emphasis;
        let textStyleNormal = data.series[0].textStyle.normal
        let textStyleEmphasis = data.series[0].textStyle.emphasis

        let select = this.state.select;
        if(!select){
            this.setState({
                'backgroundStyle' : backgroundStyleNormal,
                'textStyle' : textStyleNormal,
            })
        }else{
            this.setState({
                'backgroundStyle' : backgroundStyleEmphasis,
                'textStyle' : textStyleEmphasis,
            })
        }

        // let dom = ReactDom.findDOMNode(this).parentNode;
        // let texts = ReactDom.findDOMNode(dom).querySelectorAll('.text');
        // let theText = dom.querySelector('.text');
        //
        // for (var i = 0; i < texts.length; i++) {
        //     if(i == index){
        //         if(select){
        //             this.setStyleOfObject(texts[i],textStyleEmphasis);
        //         }else {
        //             this.setStyleOfObject(texts[i],textStyleNormal);
        //         }
        //     }else{
        //         this.setStyleOfObject(texts[i],textStyleNormal);
        //     }
        // }
    }
    componentWillUnMount() {

    }
    render(){
        let select = this.state.select;
        let currentSelect = this.state.currentSelect
        let index = this.state.index
        let data = this.state.data;
        let backgroundStyleNormal =  data.series[0].backgroundStyle.normal || {};
        let backgroundStyleEmphasis =  data.series[0].backgroundStyle.emphasis || {};
        let tiangleStyleNormal =  data.series[0].tiangleStyle.normal || {};
        let tiangleStyleEmphasis =  data.series[0].tiangleStyle.emphasis || {};
        let triangleStyle = data.series[0].tiangleStyle.tritangleContainerStyle || {};
        let textStyleNormal = data.series[0].textStyle.normal
        let textStyleEmphasis = data.series[0].textStyle.emphasis

        this.state.triangleStyle = tiangleStyleEmphasis
        tiangleStyleEmphasis.borderBottomColor = 'transparent'
        tiangleStyleEmphasis.borderBottomColor = 'transparent'
        tiangleStyleEmphasis.borderStyle = 'solid'

        // console.log('textStyle',this.state.textStyle);

        let theClass = ''
        let backgClass = 'backgroundHoverClick'
        let textClass = ' textSelected'


        if(!select){
            backgClass = ' '
            textClass = ' '
            theClass = 'hide';

            // this.state.backgroundStyle = backgroundStyleNormal
            // this.state.tiangleStyle = tiangleStyleNormal

            // console.log('tritangle',this.state.tiangleStyle);
        }else {
            // this.state.tiangleStyle = tiangleStyleEmphasis
        }
        // border 样式
        let borderStyle = data.series[0].borderStyle;
        let normal = borderStyle.normal;

        return(
            <div id = 'withTriangle' className = 'fadeContainer' style = { normal } onClick={e => {this.handleClick()}}>
                <div>
                    <div className = 'backgroundContainer'>
                        <div className = {'background theAnimation ' + backgClass }  style = { this.state.backgroundStyle }> </div>
                        <div className = { 'tritangleContainer '  +  theClass }  >
                               <div className = 'tritangle' style = { this.state.triangleStyle }> </div>
                         </div>
                     </div>
                    <div className = 'textContainer' >
                        <div className = {'text ' + textClass}  style = { this.state.textStyle } onMouseEnter = { e => {this.mouseOVerHandle()}}  onMouseLeave = { e => {this.onMouseLeave()}}>
                            { this.state.theText }
                        </div>
                     </div>
                 </div>
             </div>
        )
    }
}

export default WithTriangle
