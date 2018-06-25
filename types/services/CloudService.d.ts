import FetchLambdaResponse from "../Models/FetchLambdaResponse";
import CLIArgs from "../Models/CLIArgs";
export default class CloudService {
    getFunctionsData(args: CLIArgs): Promise<FetchLambdaResponse>;
}
