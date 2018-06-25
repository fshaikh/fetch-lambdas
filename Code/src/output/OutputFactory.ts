import CLIArgs from "../models/CLIArgs";
import CsvRenderer from "./csv/CsvRenderer";
import ConsoleRenderer from "./console/ConsoleRenderer";
import FetchLambdaResponse from "../Models/FetchLambdaResponse";
import CsvConfig from "../Models/CsvConfig";
import ConsoleConfig from "../Models/ConsoleConfig";


export default function getOutputFormatter(cliArgs: CLIArgs){
    if(cliArgs.CsvFile != null && cliArgs.CsvFile !== ''){
        let csvConfig: CsvConfig = new CsvConfig();
        csvConfig.FileName = cliArgs.CsvFile;
        return new CsvRenderer(csvConfig);
    }
    let consoleConfig: ConsoleConfig = new ConsoleConfig();
    consoleConfig.ShowAllColumns = cliArgs.isAllOutput;
    return new ConsoleRenderer(consoleConfig);
}