/**
 * Main Controller for coordinating all CLI related operations
 */
import GetCommandArgs from "../cli/CLIParser";
import CLIArgs from "../Models/CLIArgs";
import CloudService from "../services/CloudService";
import FetchLambdaRequest from "../Models/FetchLambdaRequest";
import FetchLambdaResponse from "../Models/FetchLambdaResponse";
import OutputService from "../services/OutputService";
import { timingSafeEqual } from "crypto";

export default class CLIController {
    private _cloudService: CloudService;
    private _outputService: OutputService;
    constructor(){
        this._cloudService = new CloudService();
        this._outputService = new OutputService();
    }

    public async start() {
        // Get the CLI command arguments from parser
        const cliArgs: CLIArgs = GetCommandArgs();
        if(cliArgs == null){
            // If parsing or validation has failed, set the exit code and return
            this.exitProcess();
            return;
        }

        // Call cloud service to fetch lambdas
        const response: FetchLambdaResponse = await this._cloudService.getFunctionsData(cliArgs);
        if(!response.isSuccess) {
            this.exitProcess();
            return;
        }
        
        // Call output service to render results
        const status: boolean = await this._outputService.render(cliArgs, response);
        if(!status){
            this.exitProcess();
            return;
        }
        console.log('Successfully fetched lambdas');
    }

    private exitProcess(){
        process.exitCode = 1;
            return;
    }
}