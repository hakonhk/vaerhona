import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Label, ImageCompare } from './ui';

import {
  Picture,
  Statistics,
  Thermometer,
  Droplets,
  Compass,
} from '../../icons';

export default class Icon extends Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e, ...rest) {
    e.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(e, ...rest);
    }
  }

  render() {
    let icon;
    let fillColor = this.props.selected ? '#00628B' : '#000000';

    switch (this.props.type) {
      case 'image':
        icon = <Picture fill={fillColor} />;
        break;

      case 'image-compare':
        icon = (
          <ImageCompare color={fillColor}>
            <Picture fill={fillColor} />
          </ImageCompare>
        );
        break;

      case 'graph':
        icon = <Statistics fill={fillColor} />;
        break;

      case 'thermometer':
        icon = <Thermometer fill={fillColor} />;
        break;

      case 'droplets':
        icon = <Droplets fill={fillColor} />;
        break;

      case 'compass':
        icon = <Compass fill={fillColor} />;
        break;

      default:
        icon = '?';
    }

    return (
      <Container
        selected={this.props.selected}
        onClick={this.onClick}
        onTouchStart={this.onClick}
      >
        {icon}
        {this.props.label ? (
          <Label style={{ color: fillColor }}>{this.props.label}</Label>
        ) : null}
      </Container>
    );
  }
}
