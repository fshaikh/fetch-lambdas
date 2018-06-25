/**
 * Represents all CLI arguments mapped as object properties. Parser will create an instance of this object
 */

export default class CLIArgs {
    public AccessKey: string;
    public SecretKey: string;
    public SortColumn: string = 'region';
    public CsvFile: string;
    public isAllOutput: boolean = false;
}