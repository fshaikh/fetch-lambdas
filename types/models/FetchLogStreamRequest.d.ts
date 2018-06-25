import { LogStreamOrderByEnum } from "./LogStreamOrderByEnum";
export default class FetchLogStreamRequest {
    FunctionName: string;
    Region: string;
    Descending: boolean;
    OrderBy: LogStreamOrderByEnum;
    AccessKey: string;
    SecretKey: string;
}
