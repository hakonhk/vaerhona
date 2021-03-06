import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Icon extends Component {
  static defaultProps = {
    width: '22px',
    height: '22px',
    fill: '#000000',
  };

  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    fill: PropTypes.string,
  };

  render() {
    const { width, height, fill } = this.props;

    const style = {
      width,
      height,
    };

    return (
      <svg version="1.1" style={style} viewBox="0 0 22 22">
        <path
          d="M0.69 11.332l1.363 0.338 1.026-1.612-1.95-0.483c-0.488-0.122-0.981 0.174-1.102 0.66-0.121 0.484 0.176 0.976 0.663 1.097zM18.481 11.592l-4.463 4.018-5.248-4.061c-0.1-0.078-0.215-0.133-0.338-0.164l-0.699-0.172-1.026 1.611 1.099 0.271 5.698 4.408c0.165 0.129 0.361 0.191 0.558 0.191 0.219 0 0.438-0.078 0.61-0.234l5.027-4.525c0.373-0.336 0.401-0.908 0.065-1.279s-0.91-0.4-1.283-0.064zM8.684 7.181l4.887 3.129c0.412 0.263 0.96 0.154 1.239-0.247l5.028-7.242c0.285-0.412 0.182-0.975-0.231-1.26s-0.979-0.181-1.265 0.23l-4.528 6.522-4.917-3.148c-0.203-0.13-0.45-0.174-0.687-0.122s-0.442 0.195-0.571 0.399l-7.497 11.769c-0.27 0.422-0.144 0.98 0.28 1.248 0.151 0.096 0.32 0.141 0.487 0.141 0.301 0 0.595-0.148 0.768-0.42l7.007-10.999z"
          fill={fill}
        ></path>
      </svg>
    );
  }
}
