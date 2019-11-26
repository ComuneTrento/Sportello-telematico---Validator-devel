import React from 'react';
import { connect } from 'react-redux';
import { setQueryFilter } from '../actions'
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

import Stu3Flag from './Stu3Flag'

const styles = theme => ({
  search_box: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    width: "100%"
  },
})


const SearchBox = ({ dispatch, classes }) => {

  return (
    <FormControl className={classes.search_box} >
      <Input
      id="search-input"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      onChange={e => {
        e.preventDefault();

        dispatch(setQueryFilter(e.target.value));
      }}

      />
      <Stu3Flag />
    </FormControl>
  );
};

export default withStyles(styles)(connect()(SearchBox));
