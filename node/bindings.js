import Electron from "electron";


let basePath = Electron.remote.process.resourcesPath;

var ffi = require('ffi');
var ref = require('ref');
var ArrayType = require('ref-array');
var path = require('path');

var int = ref.types.int;
var double = ref.types.double;
var char = ref.types.char;
var string = ref.types.CString;
var intArray = ArrayType(double);
var charArray = ArrayType(char);

var platform = process.platform;
var appRoot = path.resolve(__dirname);

if(process.env.NODE_ENV != 'production'){
	basePath = appRoot;
}


process.env.LD_LIBRARY_PATH = `${basePath}/../cpp/wfdb/build/lib`;


// console.log("process.env.LD_LIBRARY_PATH",process.env.LD_LIBRARY_PATH)


console.log(process);
var sampleWFDB = null;

if (platform === 'win32'){
    sampleWFDB = `${basePath}/../build/Release/wfdb-wrapper.dll`;
}else if(platform === 'linux'){
    sampleWFDB = `${basePath}/../build/Release/wfdb-wrapper.so`;
    // sampleWFDB = `/home/tharun/Documents/fda_client/build/Release/wfdb-wrapper.so`;
}else if(platform === 'darwin'){
    sampleWFDB = `${basePath}/../build/Release/wfdb-wrapper.dylib`;
}else{
    throw new Error('unsupported platform for wfdb-wrapper');
}

var wfdb_test = ffi.Library(sampleWFDB, {
    "getFileInfo":[intArray,[string, intArray]],
    "getLeadNames":[charArray,[string, charArray]],
    "getSignal":[int,[int, int, int, string, intArray]]
});

module.exports = {wfdb_test, intArray};
