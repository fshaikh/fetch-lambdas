/**
 * Represents Lambda configuration values and metadata
 */
export default class LambdaData {
    public Region: string;
    public Name: string;
    public LastModified: string;
    public LastInvocation: string;
    public Memory: number;
    public CodeSize: number;
    public Timeout: number;
    public Runtime: string;
    public Description: string;
}