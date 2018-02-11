// author: bignamehere
//
import React, { Component } from 'react';
import Totals from '../components/displays/Totals/totals';


class Footer extends Component {
    render(){
        return (
            <Totals ref="displayTotals" />
        );
    }
}

export default Footer;