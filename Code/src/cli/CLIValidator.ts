import CLIArgs from "../models/CLIArgs";

export default class CLIValidator {
    public static validate(cliArgs: CLIArgs): boolean{
        if(cliArgs.AccessKey == null || cliArgs.AccessKey === '' ||
            cliArgs.SecretKey == null || cliArgs.SecretKey === ''
            ){
                return false;
            }
            return true;
    }
}