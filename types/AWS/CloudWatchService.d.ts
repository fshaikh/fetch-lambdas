import FetchLogStreamRequest from "../Models/FetchLogStreamRequest";
import { LogStream } from 'aws-sdk/clients/cloudwatchlogs';
export default class CloudWatchService {
    getLogStreams(request: FetchLogStreamRequest): Promise<LogStream[]>;
    private getLogGroupName;
    private getParams;
}
