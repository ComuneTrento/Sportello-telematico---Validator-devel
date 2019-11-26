import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import Module from './tree/Module';

const styles = theme => ({
  search_result: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 8,
    marginRight: theme.spacing.unit * 8,
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
})

class ModuleList extends React.Component {
  render() {
    const { classes, modules } = this.props;

    if (!Array.isArray(modules)) {
      return (<div></div>)
    }

    return (
      <Paper className={classes.search_result} elevation={1}>
        <List dense component="nav">{modules.map(k => (<Module moduleId={k} key={k} />))}</List>
      </Paper>
    )
  }
}

ModuleList.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      file_path: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      folders: PropTypes.array.isRequired,
      filename: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      extends: PropTypes.string.isRequired,
      urn: PropTypes.string.isRequired,
      child_urn: PropTypes.array.isRequired,
      child_code: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
  classes: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(ModuleList);
