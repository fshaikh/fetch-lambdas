import FetchLambdaRequest from "../Models/FetchLambdaRequest";
import FetchLambdaResponse from "../Models/FetchLambdaResponse";
import LambdaService from "../AWS/LambdaService";
import CLIArgs from "../Models/CLIArgs";
import AWSService from "../AWS/AWSService";


export default class CloudService {
    public async getFunctionsData(args: CLIArgs): Promise<FetchLambdaResponse> {
        // Get the regions first
        const regions = AWSService.getLambdaRegions();

        // Construct the fetch lambdas request
        const fetchLambdaRequest: FetchLambdaRequest = new FetchLambdaRequest();
        fetchLambdaRequest.Args = args;
        fetchLambdaRequest.Regions = regions;

        const lambdaService: LambdaService = new LambdaService();
        const response = await lambdaService.fetchLamdas(fetchLambdaRequest);
        return response;
    }
}