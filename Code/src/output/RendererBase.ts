import FetchLambdaResponse from "../Models/FetchLambdaResponse";
import OutputConfig from "../Models/OutputConfig";
import RenderRequest from "../Models/RenderRequest";

/**
 * Base class for Renderers
 */
export default abstract class RendererBase {
    constructor() {
        //  do nothing
    }

    public abstract async render(request: RenderRequest): Promise<boolean> ;
}