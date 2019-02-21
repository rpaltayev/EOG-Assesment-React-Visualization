import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import CardContent from '@material-ui/core/CardContent';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { withStyles } from "@material-ui/core/styles";

import MyMap from './MyMap';

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


class DroneLocation extends Component {
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
    const {classes, latitude, longitude } = this.props;
    return (
      <div>
        <Card className={ classes.card }>
          <CardHeader title="RealTime Graphical Visualization of Drone's Temp" />
          <CardContent>
            <MyMap
              latitude={latitude}
              longitude={longitude}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCSrmQ2sJuZJGraZ3RYVGtqDaykygpVA6g&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ width: '100%', height: '100%' }} />}
              containerElement={
                <div style={{ width: '650px', height: '400px' }} />
              }
              mapElement={<div style={{ width: '100%', height: `100%` }} />}
            />
          </CardContent>
        </Card>
      </div>);
  }
}

const mapState = (state, ownProps) => {
  const {
    latitude,
    longitude
  } = state.drone;
  return {
    latitude,
    longitude
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
)(withStyles(styles)(DroneLocation));
