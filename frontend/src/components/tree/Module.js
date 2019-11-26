import React from 'react';
import { connect, useSelector } from 'react-redux';
import findIndex from 'lodash/findIndex';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import InsertDriveFileOutlined from '@material-ui/icons/InsertDriveFileOutlined';
import SaveAlt from '@material-ui/icons/SaveAlt';
import FolderTwoTone from "@material-ui/icons/FolderTwoTone";
import Edit from '@material-ui/icons/Edit';
import { startDownloadModule, editModule } from '../../actions'

const styles = theme => ({
  noMaxWidth: {
    maxWidth: 'none',
  },
  folderContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  folderIcon: {
    margin: 0,
    verticalAlign: 'middle',
    color: '#969696',
    marginRight: theme.spacing.unit * 0.5,
  },
})

function Module({ classes, module, dispatch }) {
  const stu3Flag = useSelector(state => state.settings.stu3Flag)
  const flag = stu3Flag ? '?stu3=true' : ''
  return (
      <ListItem
        divider
        button
        onClick={() => window.open(`/module/${module.key}${flag}`, "_blank")}
        >
        <ListItemIcon>
            <Tooltip title={module.file_path} placement="left" classes={{ tooltip: classes.noMaxWidth }}>
              <InsertDriveFileOutlined />
            </Tooltip>
          </ListItemIcon>
          <ListItemText
            primary={<React.Fragment>
              <div className={classes.folderContainer}>
                <FolderTwoTone className={classes.folderIcon} fontSize="small" />
                {module.folders.join('/')}
              </div>
              </React.Fragment>}
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  {module.filename}
                </Typography>
                {module.urn}
              </React.Fragment>
            }
          />
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              dispatch(editModule(module.key))
              console.log(`Edit module with key: ${module.key}`)
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              dispatch(startDownloadModule(module.key))
              console.log(`Download module with key: ${module.key}`)
            }}
          >
            <SaveAlt />
          </IconButton>
      </ListItem>
  )
}

const mapStateToProps = (state, props) => {
  const index = findIndex(state.modules, m => m.key === props.moduleId)
  if (index < 0) {
    throw new Error(`Can't find module with ID: ${props.moduleId} in the store.`);
  }

  return {
      module: state.modules[index],
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Module))
