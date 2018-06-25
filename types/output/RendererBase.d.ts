import RenderRequest from "../Models/RenderRequest";
/**
 * Base class for Renderers
 */
export default abstract class RendererBase {
    constructor();
    abstract render(request: RenderRequest): Promise<boolean>;
}
