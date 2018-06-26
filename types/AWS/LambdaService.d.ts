/**
 * Provides AWS Lambda related functionalities
 */
import FetchLambdaRequest from '../Models/FetchLambdaRequest';
import FetchLambdaResponse from '../Models/FetchLambdaResponse';
export default class LambdaService {
    private _cloudWatchService;
    /**
     * Initializes a new instance of LambdaService
     */
    constructor();
    /**
     *
     * @param request Request object containing required config to be passed to AWS
     */
    fetchLamdas(request: FetchLambdaRequest): Promise<FetchLambdaResponse>;
    /**
     * Creates AWS Lambda object
     * @param region - AWS Region
     * @param args - CLI Arguments
     */
    private createLambda;
    private getLambdaData;
    /**
     * Gets params for passing to listFunctions API call to AWs Lambda
     */
    private getListFunctionsParams;
    /**
     *
     * @param region - AWS Region
     * @param functions - List of Lambdas in the region
     */
    private parseFunctions;
    private getLastInvocation;
}
