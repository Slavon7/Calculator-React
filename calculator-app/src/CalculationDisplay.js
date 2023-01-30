import React, { Component } from 'react';
import './App.css';

class CalculationDisplay extends Component {
    render() {
        return (
            <div className='display__menu'>
                <input value={this.props.calculation} className='display' />
            </div>
        )
    }
}

export default CalculationDisplay;