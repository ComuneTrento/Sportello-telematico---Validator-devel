import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class RawModule extends Component {
  getModalStyle = () => {
    const top = 30;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  render() {
    const { module, classes } = this.props;

    return (
      <div style={this.getModalStyle()} className={classes.paper}>
       <h1>{module.filename}</h1>
      </div>
    );
  }
}

export default withStyles(styles)(RawModule);
