import fs from 'fs';
import CsvRequest from "./CsvRequest";

/**
 * Generates Csv file using node fs module
 */
export default class CsvGenerator {
    public async write(request: CsvRequest) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const headerString = this.stringify(request.Columns);
            const rowsString = this.getRowsString(request);
            const csvData = headerString + "\n" + rowsString;
            fs.writeFile(request.Path, csvData ,(err) => {
                if(err){
                    resolve(false);
                }else{
                    resolve(true);
                }
            });
        });
        
    }

    private stringify(request: Array<string>): string {
        return request.join(',') + ',';
    }

    private getRowsString(request: CsvRequest): string {
        const rows: string[][] = request.Rows;
        let formattedRow: string = '';
        rows.map((row) => {
            formattedRow += this.stringify(row) + "," + "\n";
        });
        return formattedRow;
    }
}