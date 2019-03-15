import React, { Component } from 'react'
import ViewerPage from './ViewerPage';
import FullDisclosure from './FullDisclosure';
const downloadsFolder = require('downloads-folder');
let downloadsFolderPath = downloadsFolder();
var basePath = downloadsFolderPath + '/';

export default class container extends Component {
  render() {
    return (
      <div style={{padding:"20px"}}>
        <h1>DeepRthythm Viewer</h1>
        <ViewerPage basePath={basePath}/>
        <FullDisclosure basePath={basePath}/>
      </div>
    )
  }
}
