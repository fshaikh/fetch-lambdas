import RendererBase from "../RendererBase";
import FetchLambdaResponse from "../../Models/FetchLambdaResponse";
import CsvConfig from "../../Models/CsvConfig";
import RenderRequest from "../../Models/RenderRequest";
const createCsvWriter = require('csv-writer').createArrayCsvWriter;

/**
 * Renderer for rendering output to CSV
 */
export default class CsvRenderer extends RendererBase{
    constructor(private _csvConfig: CsvConfig){
        super();
    }

    public async render(request: RenderRequest): Promise<boolean> {
        const headers = this.getCsvColumns(request);
        const csvWriter = createCsvWriter({
            path: this._csvConfig.FileName,
            header: headers
        });
         
        const records = request.Rows.Rows;
         
        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...Done');
            });

            return true;
    }

    private getCsvColumns(request: RenderRequest){
        let columns = [];
        columns = request.Columns.Cols.map(item => item.Name);
        return columns;
    }
    
}