import RendererBase from "../RendererBase";
import CLIArgs from "../../models/CLIArgs";
import FetchLambdaResponse from "../../Models/FetchLambdaResponse";
import ConsoleConfig from "../../Models/ConsoleConfig";
import RenderRequest from "../../Models/RenderRequest";

/**
 * Renderer for rendering output to console
 */
export default class ConsoleRenderer extends RendererBase {
    constructor(private _consoleConfig: ConsoleConfig){
        super();
    }

    public async render(request: RenderRequest): Promise<boolean> {
        // Render columns first
        const columns = this.getColumns();
        let columnString = ''
        for (const iterator of columns) {
            columnString += iterator;
        }
        return true;
    }

    private getColumns(): string[] {
        return [
            'Region',
            'Name',
            'Last Modified',
            'Last Invocation'
        ];
    }
}