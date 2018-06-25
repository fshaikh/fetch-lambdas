/**
 * Represents all CLI arguments mapped as object properties. Parser will create an instance of this object
 */
export default class CLIArgs {
    AccessKey: string;
    SecretKey: string;
    SortColumn: string;
    CsvFile: string;
    isAllOutput: boolean;
}
