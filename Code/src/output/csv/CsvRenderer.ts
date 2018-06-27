import RendererBase from "../RendererBase";
import FetchLambdaResponse from "../../Models/FetchLambdaResponse";
import CsvConfig from "../../Models/CsvConfig";
import RenderRequest from "../../Models/RenderRequest";
import CsvGenerator from "./CsvGenerator";
import CsvRequest from "./CsvRequest";
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
        const csvGenerator: CsvGenerator = new CsvGenerator();
        let csvRequest: CsvRequest = {
             Path : this._csvConfig.FileName,
             Columns : headers,
             Rows: request.Rows.Rows
        };
        try{
            const response = await csvGenerator.write(csvRequest);
            return response;
        }catch(e){
            console.log(`Error in writing to CSV:`);
            return false;
        }
    }

    private getCsvColumns(request: RenderRequest){
        let columns = [];
        columns = request.Columns.Cols.map(item => item.Name);
        return columns;
    }
    
}