#include <stdio.h>
#include <cstdlib>
#include <iostream>
#include "wfdb/lib/wfdb.h"
#include "wfdbwrapper.h"


int* getFileInfo(char* filename, int* result){
    //This functions reads the file and returns the result.
    // result -> its a 3X1 int array, where
    // result[0] -> Signal Sample Length
    // result [1] -> Sampling frequency
    // result [2] -> Total number of lead channels
    return result;
}


char* getLeadNames(char* filename, char* result){
    //This functions reads the file and returns the names of all lead channels in result.
    // result -> A character array with all the lead names(or we can use some char to represnt each name)
    // from the secified file.
    return result;
}

// int* getSignal(int from, int to, char channelName ,char* filename, int* result){
//     // This function returns all the samples requested in an array for the specified duration, file and channel.
//     return result;
// }


int getSignal(int from, int to, int channelNum ,char* filename, double* signal){
    // This function returns all the samples requested in an array for the specified duration, file and channel.
    // std::cout<<"from:  "<<from<<"  to: "<<to<<" channelNum: "<< channelNum<<"   filename: "<<filename<<std::endl;
    // std::cout<<isigopen(filename, NULL, 0)<<std::endl;
    WFDB_Siginfo *siarray;
    WFDB_Sample *vec;
    if(isigopen(filename, NULL, 0) == -1){
        
        exit(2);
    }
    int nsig = isigopen(filename, NULL, 0);
    siarray = (WFDB_Siginfo *)malloc(nsig * sizeof(WFDB_Siginfo));
    nsig = isigopen(filename, siarray, nsig);
    vec = (WFDB_Sample *)malloc(nsig * sizeof(WFDB_Sample));
    if (vec == NULL){
        fprintf(stderr, "%s: insufficient memory\n");
        exit(2);
    }
    // signal = (int *)malloc((to - from) * sizeof( int));
    int signal_counter = 0;
    for (int i = 0; i <= to; i++) {
        if (getvec(vec) < 0)
            break;
        if(i > from){
            signal[signal_counter] = aduphys(channelNum,vec[channelNum]);
            signal_counter++;
        }
    }
    return nsig;
}