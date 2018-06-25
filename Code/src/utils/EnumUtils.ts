/** 
        * This class defines Enum-related functions
 */

export default class EnumUtils{
    /**
         * This function returns string representation of an enum value
         * @param enumObj    Enum type to work with.
         * @param enumValue  Enum value.
         * @returns       String representation of an enum value.
    */
    public static getEnumString(enumObj: any, enumValue: any){
        var isValueProperty = parseInt(enumValue, 10) >= 0
        if (isValueProperty) {
            return enumObj[enumValue];
        }
        return "";
    }
}