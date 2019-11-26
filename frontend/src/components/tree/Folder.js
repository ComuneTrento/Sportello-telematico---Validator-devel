import React from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';

import Module from './Module'
import { Folder } from '../ModuleTree'

function getSubModules(modules, folders) {
  return modules
    .filter(m => m.folders_search === folders.join('/'))
    .sort()
}

function getSubFolders(modules, folders) {
  return [...new Set(modules
    .filter(m => m.folders_search.startsWith(folders.join('/')))
    .filter(m => m.folders.length > folders.length)
    .map(m => m.folders[folders.length])
    .sort())]
}

class ModuleFolderCompoment extends React.Component {
  render() {
    const {
      subModules,
      subFolders,
      folders } = this.props;

    const foldersItem = subFolders.map(f => (<Folder key={[...folders, f].join('/')} folders={[...folders, f]} />));
    const modulesItem = subModules.map(m => (<Module moduleId={m.key} key={m.key} />));

    return (
      <List
        dense
        component="div"
        style={{ paddingLeft: folders.length * 16 }}
      >
        {foldersItem}
        {modulesItem}
      </List>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
      subModules: getSubModules(state.modules, props.folders),
      subFolders: getSubFolders(state.modules, props.folders),
  }
}

const ModuleFolder = connect(mapStateToProps)(ModuleFolderCompoment)

export default ModuleFolder;
