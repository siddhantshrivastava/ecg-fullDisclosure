import {getFileDetails} from './getFileDetails'
import q from "q";
var { wfdb_test, intArray } = require('../../node/bindings');

export const getPlotData = (file_id,basePath) => {
    let defer = q.defer();
    getFileDetails(file_id,basePath).then((fileDetails) => {
      let data = [];
      process.env.WFDB = `${basePath}tmp/`;
      let arraySize = fileDetails.signalLength-1;
      let maxMilli=1000/fileDetails.sampleFrequency;
      let a = new Array(arraySize);
      var signalData = intArray(a);
      var status = wfdb_test.getSignal(0, fileDetails.signalLength, 0, `${file_id}/${file_id}`, signalData);
      for (let i = 0,j=0; j < signalData.length; i+=maxMilli,j++) {
        data.push([Number(i.toFixed(2)), signalData[j]])
      }
      defer.resolve(data);
    }
    )
    return defer.promise;
  }