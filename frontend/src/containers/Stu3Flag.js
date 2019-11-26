import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Stu3Flag() {
  const dispatch = useDispatch()
  const flag = useSelector(state => state.settings.stu3Flag)
  return (
    <FormControlLabel
    control={
      <Checkbox
        checked={flag}
        onChange={(e) => dispatch({type: 'UPDATE_SETTING', settings: { stu3Flag: e.target.checked}})}
        value="stu3_flag"
        color="primary"
      />
    }
    label="STU3 loader"
  />
  )
};
