import CLIArgs from "../models/CLIArgs";

/**
 * Parser for CLI command arguments
 */

const appPackage = require('../../package.json');
import commander from 'commander';
import CLIValidator from "./CLIValidator";

/**
 * Returns CLIArgs
 */
const GetCommandArgs = (): CLIArgs => {
    let cliArgs: CLIArgs = new CLIArgs();
    // Use commander to parse arguments and construct CLIArgs
    commander
        .version(appPackage.version)
        .option('--accessKey <required>','API Access Key of the AWS account for which the Lambdas are to be fetched')
        .option('--secretKey <required>','Secret Key of the AWS account for which the Lambdas are to be fetched')
        .option('--csv [optional]','CSV file name which will contain the results. ')
        .option('--all [optional]','Show all metadata in columns in the console output.')
        .option('--sortBy [optional]','Sort column name.')
        .parse(process.argv);

    cliArgs.AccessKey = commander.accessKey;
    cliArgs.SecretKey = commander.secretKey;
    cliArgs.CsvFile = commander.csv;
    cliArgs.isAllOutput = commander.all;
    cliArgs.SortColumn = commander.sortBy;

    if(!CLIValidator.validate(cliArgs)){
        commander.outputHelp();
        return null;
    }
    return cliArgs;
};

export default GetCommandArgs;