import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import CardContent from '@material-ui/core/CardContent';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { withStyles } from "@material-ui/core/styles";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: 'white'
  }
});

const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: '1% 1%'
    // width: '700px',
    // height: '500px'
  }
};

const convertToHours = timestamp => {
  const ts = new Date(timestamp);
  return ts.toLocaleTimeString();
};

class Test extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.interval = setInterval(() => {
      this.props.onLoad();
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { metricsData, classes } = this.props;
    const data = metricsData.map(line => {
    return {
        timestamp: convertToHours(line['timestamp']),
        metric: line['metric']
      };
    });
    return (
      <div>
        <Card className={ classes.card }>
          <CardHeader title="RealTime Graphical Visualization of Drone's Temp" />
          <CardContent>
            <LineChart
              width={650}
              height={400}
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="metric" stroke="black" />
              <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
              <XAxis dataKey={'timestamp'} />
              <YAxis type="number" domain={['dataMax - 200', 'auto']} />
              <Tooltip />
            </LineChart>
          </CardContent>
        </Card>
      </div>);
  }
}

const mapState = (state, ownProps) => {
  const {
    metricsData
  } = state.drone;
  return {
    metricsData
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE
    })
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Test));
