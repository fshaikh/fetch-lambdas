/**
 * Provides AWS Lambda related functionalities
 */
// import AWS object without services
import AWS = require('aws-sdk/global');
// import individual service
import CloudWatchLogs = require('aws-sdk/clients/cloudwatchlogs');
import { AWSError } from 'aws-sdk/global';

import FetchLogStreamRequest from "../Models/FetchLogStreamRequest";
import EnumUtils from '../utils/EnumUtils';
import { LogStreamOrderByEnum } from '../Models/LogStreamOrderByEnum';
import { DescribeLogStreamsRequest, DescribeLogStreamsResponse, LogStream } from 'aws-sdk/clients/cloudwatchlogs';


 export default class CloudWatchService {
     // Cloud Watch
     //   Log Group 1 (/aws/lambda/<name>)
     //     Log Stream 1 (Name, Last Event Time)
     //         Log Event 1
     //         Log Event 2
     //         ...
     //     Log Stream 2
     //     ...
     //   Log Group 2
     //   ...
     public async getLogStreams(request: FetchLogStreamRequest) : Promise<LogStream[]> {
         return new Promise<LogStream[]>((resolve, reject) => {
            const cloudwatchlogs: CloudWatchLogs = new CloudWatchLogs({
                region: request.Region,
                secretAccessKey: request.SecretKey,
                accessKeyId: request.AccessKey
            });

            cloudwatchlogs.describeLogStreams(this.getParams(request), (err: AWSError, data: DescribeLogStreamsResponse) => {
                if(err) {
                    console.log(`Error in fetching log streams. This will have impact on last invocation date.: ${err.message}`);
                    resolve([]);
                }else{
                    resolve(data.logStreams);
                }
            });
         });
     }

     private getLogGroupName(lambdaName: string): string {
        return `/aws/lambda/${lambdaName}`;
     }

     private getParams(request: FetchLogStreamRequest): DescribeLogStreamsRequest {
         let describeLogStreamRequest: DescribeLogStreamsRequest = {
             logGroupName : this.getLogGroupName(request.FunctionName),
             descending: request.Descending,
             limit: 10,
             orderBy: EnumUtils.getEnumString(LogStreamOrderByEnum, request.OrderBy)
         }
         return describeLogStreamRequest;
     }

     // Considering the above hierarchy, algorithm to get the last invocation time is as below:
     //  
 }