/*
* @Author: haiwnag
* @Date:   2017-01-11 15:39:38
* @Last modified by:   haiwang
* @Last modified time: 2017-01-11 16:37:55
*/

'use strict';



import React from 'react';
import data from './data';
import Nav from '../nav/index';

class NavWrap extends React.Component {
    onChange(value) {

        console.log('value:', value);
    }
    render() {

        return (
            <Nav
                data={data}
                onChange={this.onChange}
            />
        );

    }
}

export default NavWrap;
