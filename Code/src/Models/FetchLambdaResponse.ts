import LambdaData from "./LambdaData";
import ResponseBase from "./ResponseBase";

export default class FetchLambdaResponse extends ResponseBase {
    public FunctionsData: LambdaData[] = [];
}