import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FilteredModuleList from './containers/FilteredModuleList'
import FilteredModuleTree from './containers/FilteredModuleTree'
import SearchBox from './containers/SearchBox'
import ErrorDialog from './components/ErrorDialog'

import { getModules } from './actions'
import './App.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  search_box: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    width: "100%"
  },
  search_result: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 8,
    marginRight: theme.spacing.unit * 8,
  },
  module_box: {
    marginBottom: theme.spacing.unit * 2,
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
})


class SearchGrid extends React.Component {
  state = {
    query: '',
    queryFilter: 'file_path',

    // Current target.
    openModule: false,
    moduleTarget: null,
  };

  componentDidMount = () => this.props.onLoad()

  render() {
    const { classes, query } = this.props;

    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={16}
        className={classes.search_box}>
          <Grid item xs={8}>
            <SearchBox />
          </Grid>
        </Grid>
        {query ? <FilteredModuleList /> : <FilteredModuleTree />}
        <ErrorDialog />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    query: state.queryFilter,
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: () => {
            dispatch(getModules())
        }
    };
}

SearchGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchGrid));
