/**
 * Provides AWS Lambda related functionalities
 */

 // import AWS object without services
import AWS = require('aws-sdk/global');
// import individual service
import Lambda = require('aws-sdk/clients/lambda');
import { AWSError } from 'aws-sdk/global';
import { FunctionList } from 'aws-sdk/clients/lambda';

import FetchLambdaRequest from '../Models/FetchLambdaRequest';
import FetchLambdaResponse from '../Models/FetchLambdaResponse';
import CLIArgs from '../Models/CLIArgs';
import LambdaData from '../Models/LambdaData';
import { FunctionConfiguration } from 'aws-sdk/clients/greengrass';
import CloudWatchService from './CloudWatchService';
import FetchLogStreamRequest from '../Models/FetchLogStreamRequest';
import { LogStreamOrderByEnum } from '../Models/LogStreamOrderByEnum';

 export default class LambdaService {
    private _cloudWatchService: CloudWatchService;

    /**
     * Initializes a new instance of LambdaService
     */
    constructor(){
        this._cloudWatchService = new CloudWatchService();
    }
    /**
     * 
     * @param request Request object containing required config to be passed to AWS
     */
     public async fetchLamdas(request: FetchLambdaRequest): Promise<FetchLambdaResponse> {
         return new Promise<FetchLambdaResponse>((resolve, reject) => {
            const regions = request.Regions;
            const args = request.Args;
            var response: FetchLambdaResponse = new FetchLambdaResponse();
            try{
                // Enumerate each region and get lambda
                
                regions.forEach((region: string) => {
                    const lambda: Lambda = this.createLambda(region, args);
                    const params = this.getListFunctionsParams();

                   

                    lambda.listFunctions(params, async (err: AWSError, data: Lambda.ListFunctionsResponse) => {
                        if(err){
                            console.log(`Error in fetching lambdas for : ${request.Regions}`);
                            response.isSuccess = false;
                            response.error = err.message;
                            resolve(response);
                        }else{
                            const functions: FunctionList = data.Functions;
                            const lamdasData = await this.parseFunctions(region, request, functions);
                            response.FunctionsData.push(...lamdasData);
                            resolve(response);
                        }
                    });
                });
            }catch(e){
                response.isSuccess = false;
                resolve(response);
            }
         });
     }

     /**
      * Creates AWS Lambda object
      * @param region - AWS Region
      * @param args - CLI Arguments
      */
     private createLambda(region: string, args: CLIArgs): Lambda {
         return new Lambda({
            region: region,
            accessKeyId: args.AccessKey,
            secretAccessKey: args.SecretKey
        });
     }

     /**
      * Gets params for passing to listFunctions API call to AWs Lambda
      */
     private getListFunctionsParams(){
        return {
            FunctionVersion: 'ALL'
        };
     }

     /**
      * 
      * @param region - AWS Region
      * @param functions - List of Lambdas in the region
      */
     private async parseFunctions(region: string, request: FetchLambdaRequest, functions: FunctionList): Promise<LambdaData[]> {
        let functionsData: LambdaData[] = [];

        for(let fnConfig of functions){
            let lambdaData: LambdaData = new LambdaData();
            lambdaData.Description = fnConfig.Description;
            lambdaData.LastModified = fnConfig.LastModified;
            lambdaData.Memory = fnConfig.MemorySize;
            lambdaData.Name = fnConfig.FunctionName;
            lambdaData.Region = region;
            lambdaData.Runtime = fnConfig.Runtime;
            lambdaData.CodeSize = fnConfig.CodeSize;
            lambdaData.Timeout = fnConfig.Timeout;
            lambdaData.LastInvocation = await this.getLastInvocation(region,request, fnConfig);

            functionsData.push(lambdaData);
        }

        return functionsData;
    }

    private async getLastInvocation(region: string,request: FetchLambdaRequest, fnConfig: Lambda.FunctionConfiguration): Promise<string> {
        let fetchLogStreamRequest: FetchLogStreamRequest = new FetchLogStreamRequest();
        fetchLogStreamRequest.FunctionName = fnConfig.FunctionName;
        fetchLogStreamRequest.Descending = true;
        fetchLogStreamRequest.Region = region;
        fetchLogStreamRequest.OrderBy = LogStreamOrderByEnum.LastEventTime;
        fetchLogStreamRequest.AccessKey = request.Args.AccessKey;
        fetchLogStreamRequest.SecretKey = request.Args.SecretKey;
        const logStreams = await this._cloudWatchService.getLogStreams(fetchLogStreamRequest);
        if(logStreams == null || logStreams.length === 0){
            return '';
        }
        return logStreams[0].lastEventTimestamp.toString();
    }
 }