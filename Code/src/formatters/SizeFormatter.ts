/**
 * Formatter for transforming size value to MB/GB from bytes or vice versa
 */

 const MB: number =  1024 * 1024;

 /**
  * Converts from bytes to MB
  * @param bytes - Size in bytes
  */
 export function toMB(bytes: number): number {
     return bytes / MB;
 }