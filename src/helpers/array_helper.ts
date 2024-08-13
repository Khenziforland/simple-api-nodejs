class ArrayHelper {
  /**
   ** Check if a value is present in an array.
   *
   * @param value
   * @param array
   * @returns boolean
   */
  public static isValueInArray = (value: any, array: any[]) => {
    return array.includes(value);
  };

  /**
   ** Find values in array based on a property value.
   *
   * @param arr
   * @param prop
   * @param val
   * @returns array
   */
  public static findInArray = (arr: any[], prop: string, val: any) => {
    return arr.reduce((result: any[], item: any) => {
      if (item[prop] === val) {
        result.push(item[prop]);
      }
      return result;
    }, []);
  };
}

export default ArrayHelper;
