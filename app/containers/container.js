import React, { Component } from 'react'
import ViewerPage from './ViewerPage';
import FullDisclosure from './FullDisclosure';
const downloadsFolder = require('downloads-folder');
let downloadsFolderPath = downloadsFolder();
var basePath = downloadsFolderPath + '/';

export default class container extends Component {
  render() {
    return (
      <div>
        <h1>DeepRthythm Viewer</h1>
        <div className="main-container" width="1280" height="900" style={{ border: "solid 1px #eee", borderBottom: "solid 1px #ccc",padding:"10px" }} />
        <ViewerPage basePath={basePath}/>
        <FullDisclosure basePath={basePath}/>
      </div>
    )
  }
}
