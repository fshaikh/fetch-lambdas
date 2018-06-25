import FetchLambdaResponse from "../Models/FetchLambdaResponse";
import CLIArgs from "../models/CLIArgs";
import getOutputFormatter from "../output/OutputFactory";
import RenderRequest from "../Models/RenderRequest";
import Columns from "../Models/Columns";
import Column from "../Models/Column";
import Rows from "../Models/Rows";
import LambdaData from "../Models/LambdaData";
import Row from "../Models/Row";
import { getDaysAgoForDate, getDaysAgoForTimestamp } from "../formatters/DaysAgoFormatter";
import { toMB } from "../formatters/SizeFormatter";
const DefinedColumns = require('../../columns.json');

export default class OutputService{
    public async render(cliArgs: CLIArgs, response: FetchLambdaResponse): Promise<boolean>{
        // get the outpur renderer first
        const renderer = getOutputFormatter(cliArgs);
        if(renderer == null){
            console.log(`Error in rendering.`)
            return false;
        }

        // Generate request for rendering to a renderer host
        let renderRequest: RenderRequest = this.createRenderRequest(cliArgs, response);
        return await renderer.render(renderRequest);
    }

    private createRenderRequest(cliArgs: CLIArgs, response: FetchLambdaResponse): RenderRequest{
        // Create columns
        const columns: Columns = this.createColumns(cliArgs);
        // Create rows
        const rows: Rows = this.createRows(cliArgs, response);

        let renderRequest: RenderRequest = {
            Columns : columns,
            Rows : rows
        };
        return renderRequest;
    }

    private createColumns(cliArgs: CLIArgs): Columns {
        let columns: Columns = new Columns();
        columns.Cols.push(...DefinedColumns);
        return columns;
    }

    private createRows(cliArgs: CLIArgs, response: FetchLambdaResponse): Rows{
        let rows: Rows = new Rows();
        response.FunctionsData.forEach((element: LambdaData) => {
            let row: Array<string> = new Array<string>();

           
            row.push(element.Region);
            row.push(element.Name);
            row.push(getDaysAgoForDate(element.LastModified));
            row.push(getDaysAgoForTimestamp(element.LastInvocation));
            row.push(element.Memory.toString());
            row.push(element.Runtime);
            row.push(element.Timeout.toString());
            row.push(toMB(element.CodeSize).toString());
            row.push(element.Description);

            rows.Rows.push(row);
        });

        return rows;
    }
}