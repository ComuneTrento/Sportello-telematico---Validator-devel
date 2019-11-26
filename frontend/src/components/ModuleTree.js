import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import FolderIcon from "@material-ui/icons/Folder";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SaveAlt from '@material-ui/icons/SaveAlt'

import ModuleFolder from './tree/Folder'
import { startDownloadFolder } from '../actions'

const styles = theme => ({
  search_result: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 8,
    marginRight: theme.spacing.unit * 8,
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
})

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toogleOpen = () => {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    const { classes,  downloadLoading, folders, dispatch } = this.props;

    return (
      <div>
      <ListItem

        divider
        button
        onClick={this.toogleOpen}
        >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText inset primary={folders[folders.length-1]} />

        <IconButton
          disabled={downloadLoading}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(startDownloadFolder(folders))
          }}
        >
          <SaveAlt />
          {downloadLoading && <CircularProgress size={50} className={classes.progress} />}
        </IconButton>
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <ModuleFolder folders={folders} />
      </Collapse>
      </div>
    );

  }
}

class ModuleTree extends React.Component {
  render() {
    const { classes, modules } = this.props;

    if (!Array.isArray(modules)) {
      return (
        <Paper className={classes.search_result} elevation={1}>
          <Typography variant="h5">No modules.</Typography>
        </Paper>
      )
    }

    return (
      <Paper className={classes.search_result} elevation={1}>
        <ModuleFolder folders={[]}></ModuleFolder>
      </Paper>
    )
  }
}

ModuleTree.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      file_path: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      folders: PropTypes.array.isRequired,
      filename: PropTypes.string.isRequired,
      code: PropTypes.string,
      extends: PropTypes.string,
      urn: PropTypes.string,
      child_urn: PropTypes.array,
      child_code: PropTypes.array,
    }).isRequired
  ).isRequired,
  classes: PropTypes.object.isRequired,
  // clickHandler: PropTypes.func,
  // layer: PropTypes.number.isRequired,
};

ModuleTree = withStyles(styles)(ModuleTree)
Folder = withStyles(styles)(connect(
  (state, props) => {

    if (state.currentDownloadStatus.hasOwnProperty('folders')) {
      if (Array.isArray(state.currentDownloadStatus.folders)) {
        if (isEqual(state.currentDownloadStatus.folders.join('/'), props.folders.join('/'))) {
          return { downloadLoading: true}
        }
      }
    }

    return { downloadLoading: false }
  }
)(Folder))

export {
  ModuleTree,
  Folder,
}
