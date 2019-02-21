import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import CardContent from '@material-ui/core/CardContent';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from "@material-ui/core/styles";
import AvatarRaw from '@material-ui/core/Avatar';

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: 'white'
  }
});

const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const avatarStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: 'white'
  }
});
const Avatar = withStyles(avatarStyles)(AvatarRaw);

const styles = {
  card: {
    margin: '1% 1%'
    // width: '700px',
    // height: '500px'
  }
};

class DroneInfo extends Component {
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
    const { latitude, longitude, metric, classes } = this.props;
    return (
      <div>
        <Card
        className={classes.card}
        style={{ minWidth: '700px', height: '500px' }}>
        <CardHeader title="RealTime Information of the Drone" />
        <CardContent>
          <List>
            <ListItem>
              <Avatar>1</Avatar>
              <ListItemText
                primary={`Temperature: ${metric || '249.20709327988456'}`}
              />
            </ListItem>
            <ListItem>
              <Avatar>2</Avatar>
              <ListItemText
                primary={`Latitude: ${latitude || '28.492074543952448'}`}
              />
            </ListItem>
            <ListItem>
              <Avatar>3</Avatar>
              <ListItemText
                primary={`Longitude: ${longitude || '-95.4928720669904'}`}
              />
            </ListItem>
            <ListItem>
              <Avatar>4</Avatar>
              <ListItemText primary={'Last Received: 2 seconds ago'} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      </div>);
  }
};

const mapState = (state, ownProps) => {
  const {
    mlatitude,
    longitude,
    metric
  } = state.drone;
  return {
    mlatitude,
    longitude,
    metric
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
)(withStyles(styles)(DroneInfo));
