import RendererBase from "../RendererBase";
import CsvConfig from "../../Models/CsvConfig";
import RenderRequest from "../../Models/RenderRequest";
/**
 * Renderer for rendering output to CSV
 */
export default class CsvRenderer extends RendererBase {
    private _csvConfig;
    constructor(_csvConfig: CsvConfig);
    render(request: RenderRequest): Promise<boolean>;
    private getCsvColumns;
}
