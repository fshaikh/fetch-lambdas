/**
 * Represents Lambda configuration values and metadata
 */
export default class LambdaData {
    Region: string;
    Name: string;
    LastModified: string;
    LastInvocation: string;
    Memory: number;
    CodeSize: number;
    Timeout: number;
    Runtime: string;
    Description: string;
}
