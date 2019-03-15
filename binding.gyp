{
  "targets": [
    {
      "target_name": "wfdb-wrapper",
      "type": "shared_library",
      "sources": [ "cpp/wfdbwrapper.cc" ],
      "libraries": ["-L./cpp/wfdb/build/lib/", "-lwfdb"],
       "cflags!": [ "-fno-exceptions" ],
       "cflags_cc!": [ "-fno-exceptions" ]
    }
  ]
}