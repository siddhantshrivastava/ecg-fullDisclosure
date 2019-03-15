#ifdef __linux__
  extern "C" int* getFileInfo(char* filename, int* result);
  extern "C" char* getLeadNames(char* filename, char* result);
  extern "C" int getSignal(int from, int to, int channelNum ,char* filename, double* signal);
#elif _WIN32
  extern "C"  __declspec(dllexport) int* getFileInfo(char* filename, int* result);
  extern "C"  __declspec(dllexport) char* getLeadNames(char* filename, char* result);
  extern "C"  __declspec(dllexport) int getSignal(int from, int to, int channelNum ,char* filename, double* signal);
#elif __APPLE__
  extern "C" int* getFileInfo(char* filename, int* result);
  extern "C" char* getLeadNames(char* filename, char* result);
  extern "C" int getSignal(int from, int to, int channelNum ,char* filename, double* signal);
#endif
