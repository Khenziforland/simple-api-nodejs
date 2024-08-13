class CheckHelper {
  /**
   ** Check if a value is empty.
   *
   * @param value
   * @returns boolean
   */
  public static isset = (value: any) => {
    return value !== undefined && value !== null;
  };

  /**
   ** Check if a value is empty for string.
   *
   * @param value
   * @returns boolean
   */
  public static issetString = (value: any) => {
    return value !== undefined && value !== null && value !== "";
  };
}

export default CheckHelper;
