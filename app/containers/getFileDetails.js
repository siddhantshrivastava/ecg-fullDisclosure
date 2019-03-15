import q from "q";
import fs from "fs";

export const getFileDetails = (file_id,basePath) => {
    let defer = q.defer();
    let path = `${basePath}tmp/${file_id}/${file_id}.hea`;
    let detailsBuffer = fs.createReadStream(path);
    let details = "";
    detailsBuffer.on('data', data => {
      details += data;
    });
    detailsBuffer.on('end', () => {
      let allLines = details.split('\n');
      let leads = [];
      let leadsLength = Number((allLines[0]).split(' ')[1])
      for (let i = 1; i <= Number(leadsLength); i++) {
        let leadDetails = allLines[i].split(' ');
        leads.push(leadDetails[leadDetails.length - 1]);
      }
      let metaInfo = {
        leadsLength,
        sampleFrequency: Number((allLines[0]).split(' ')[2]),
        signalLength: Number((allLines[0]).split(' ')[3]),
        leads
      };
      defer.resolve(metaInfo);
    })

    return defer.promise;
  }