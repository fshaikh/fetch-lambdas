/**
 * Provides global AWS related functionality
 */
const regions = require('../../lambdaRegions.json');

 export default class AWSService {
     /**
      * Gets valid AWS regions for Lambda service
      */
     public static getLambdaRegions(): string[] {
        return regions;
     }
 }