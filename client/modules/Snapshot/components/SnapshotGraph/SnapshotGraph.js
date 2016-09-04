import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import c3 from 'c3';

//import 'c3/c3.css';

import Icon from '../Icon/Icon';

import styles from './SnapshotGraph.css';

import { prettyDate } from '../../../../../shared/date';

const snapshotProperties = [
  {
    type: 'temperature',
    icon: 'thermometer',
    label: 'Temperatur',
    valueType: 'C'
  },
  {
    type: 'humidity',
    icon: 'droplets',
    label: 'Luftfuktighet',
    valueType: '%'
  },
  {
    type: 'pressure',
    icon: 'compass',
    label: 'Trykk',
    valueType: 'hPa'
  }
];

class SnapshotGraph extends Component {

  constructor (props) {
    super(props);

    this.state = {
      selectedProperty: snapshotProperties[0]
    };

    // Fix since the import 'c3/c3.css' does not work atm.
    if (typeof document !== 'undefined') {
      if (!window.__vaerhona__c3added) {
        window.__vaerhona__c3added = true;
        let styleNode = document.createElement('style');
        styleNode.innerText = `.c3 svg{font:10px sans-serif;-webkit-tap-highlight-color:transparent}.c3 line,.c3 path{fill:none;stroke:#000}.c3 text{-webkit-user-select:none;-moz-user-select:none;user-select:none}.c3-bars path,.c3-event-rect,.c3-legend-item-tile,.c3-xgrid-focus,.c3-ygrid{shape-rendering:crispEdges}.c3-chart-arc path{stroke:#fff}.c3-chart-arc text{fill:#fff;font-size:13px}.c3-grid line{stroke:#aaa}.c3-grid text{fill:#aaa}.c3-xgrid,.c3-ygrid{stroke-dasharray:3 3}.c3-text.c3-empty{fill:gray;font-size:2em}.c3-line{stroke-width:1px}.c3-circle._expanded_{stroke-width:1px;stroke:#fff}.c3-selected-circle{fill:#fff;stroke-width:2px}.c3-bar{stroke-width:0}.c3-bar._expanded_{fill-opacity:.75}.c3-target.c3-focused{opacity:1}.c3-target.c3-focused path.c3-line,.c3-target.c3-focused path.c3-step{stroke-width:2px}.c3-target.c3-defocused{opacity:.3!important}.c3-region{fill:#4682b4;fill-opacity:.1}.c3-brush .extent{fill-opacity:.1}.c3-legend-item{font-size:12px}.c3-legend-item-hidden{opacity:.15}.c3-legend-background{opacity:.75;fill:#fff;stroke:#d3d3d3;stroke-width:1}.c3-title{font:14px sans-serif}.c3-tooltip-container{z-index:10}.c3-tooltip{border-collapse:collapse;border-spacing:0;background-color:#fff;empty-cells:show;-webkit-box-shadow:7px 7px 12px -9px #777;-moz-box-shadow:7px 7px 12px -9px #777;box-shadow:7px 7px 12px -9px #777;opacity:.9}.c3-tooltip tr{border:1px solid #CCC}.c3-tooltip th{background-color:#aaa;font-size:14px;padding:2px 5px;text-align:left;color:#FFF}.c3-tooltip td{font-size:13px;padding:3px 6px;background-color:#fff;border-left:1px dotted #999}.c3-tooltip td>span{display:inline-block;width:10px;height:10px;margin-right:6px}.c3-tooltip td.value{text-align:right}.c3-area{stroke-width:0;opacity:.2}.c3-chart-arcs-title{dominant-baseline:middle;font-size:1.3em}.c3-chart-arcs .c3-chart-arcs-background{fill:#e0e0e0;stroke:none}.c3-chart-arcs .c3-chart-arcs-gauge-unit{fill:#000;font-size:16px}.c3-chart-arcs .c3-chart-arcs-gauge-max,.c3-chart-arcs .c3-chart-arcs-gauge-min{fill:#777}.c3-chart-arc .c3-gauge-value{fill:#000}`;
        document.head.appendChild(styleNode);
      }
    }
  }

  getColumnData () {
    return this.props.snapshots.map(snapshot => snapshot[this.state.selectedProperty.type]);
  }

  getColumnDates () {
    return this.props.snapshots.map(snapshot => new Date(snapshot.dateAdded));
  }

  componentDidMount () {
    this.loadChart();
  }

  componentDidUpdate () {
    this.loadChart();
  }

  loadChart () {
    if (typeof document !== 'undefined') {

      const columns = [
        ['x', ...this.getColumnDates()],
        ['data', ...this.getColumnData()]
      ];

      if (!this.chart) {
        this.chart = c3.generate({
            bindto: this.refs.inner,
            data: {
              x: 'x',
              columns
            },
            axis: {
              x: {
                type: 'timeseries',
                tick: {
                  format: '%Y-%m-%d %H:%M:%S'
                }
              }
            },
            legend: {
              show: false
            }
        });
      }
      else {
        this.chart.load({ columns });
      }
    }
  }

  setTooltip () {
    //tooltip: {
    //  format: {
    //    title: x => this.props.snapshots[x].dateAdded,
    //    name: () => '',
    //    value: (name, ratio, id, index) => (Math.round(data[index] * 10) / 10)
    //  }
    //}
  }

  changeSelectedProperty (newProperty) {
    this.setState({
      selectedProperty: newProperty
    });
  }

  render () {
    return (
      <div className={styles['outer']}>
        <div className={styles['inner']} ref='inner'>
          loading...
        </div>
        <div className={styles['prop-chooser']}>
          {
            snapshotProperties.map(prop => (
              <Icon
                selected={this.state.selectedProperty.type === prop.type}
                key={prop.type}
                type={prop.icon}
                label={prop.label}
                onClick={this.changeSelectedProperty.bind(this, prop)}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

SnapshotGraph.propTypes = {
  snapshots: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired
  })).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  return {};
}

export default connect(mapStateToProps)(SnapshotGraph);