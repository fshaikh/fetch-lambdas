import RendererBase from "../RendererBase";
import ConsoleConfig from "../../Models/ConsoleConfig";
import RenderRequest from "../../Models/RenderRequest";
/**
 * Renderer for rendering output to console
 */
export default class ConsoleRenderer extends RendererBase {
    private _consoleConfig;
    constructor(_consoleConfig: ConsoleConfig);
    render(request: RenderRequest): Promise<boolean>;
    private getColumns;
}
