import { LogStreamOrderByEnum } from "./LogStreamOrderByEnum";

export default class FetchLogStreamRequest {
    public FunctionName: string;
    public Region: string;
    public Descending: boolean;
    public OrderBy: LogStreamOrderByEnum;
    public AccessKey: string;
    public SecretKey: string;
}