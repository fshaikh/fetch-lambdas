/**
 * Formatter for transforming date value (including unix epoch time) to 'X' days ago or Today values
 */
import moment from 'moment';

 export function getDaysAgoForDate(dateValue: string): string {
     if(dateValue == null || dateValue === ''){
         return '';
     }

     // try parsing the date value
     return moment(dateValue).fromNow();
 }

 export function getDaysAgoForTimestamp(dateValue: string): string {
    if(dateValue == null || dateValue === ''){
        return '';
    }

    // try parsing the date value
    const numberVal = parseInt(dateValue);
    const formattedVal = moment.unix(numberVal/1000).format('YYYY-MM-DDTHH:MM:SS');
    return moment(formattedVal).fromNow();
}