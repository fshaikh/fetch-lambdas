import FetchLambdaResponse from "../Models/FetchLambdaResponse";
import CLIArgs from "../models/CLIArgs";
export default class OutputService {
    render(cliArgs: CLIArgs, response: FetchLambdaResponse): Promise<boolean>;
    private createRenderRequest;
    private createColumns;
    private createRows;
}
