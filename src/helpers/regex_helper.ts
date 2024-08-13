class RegexHelper {
  /**
   ** Check if a string contains alphabet.
   *
   * @param input
   * @returns boolean
   */
  public static isContainsAlphabet = (input: string) => {
    const regex = /[a-zA-Z]/;

    return regex.test(input);
  };

  /**
   ** Check if a string contains a number.
   *
   * @param input
   * @returns boolean
   */
  public static isContainsNumber = (input: string) => {
    const numberRegex = /[0-9]/;

    return numberRegex.test(input);
  };

  /**
   ** Check if a string contains a special character.
   *
   * @param input
   * @returns boolean
   */
  public static isContainsSpecialCharacter = (input: string) => {
    const specialCharacterRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    return specialCharacterRegex.test(input);
  };

  /**
   ** Check if a string contains only alphabets.
   *
   * @param input
   * @returns boolean
   */
  public static isAlphabetOnly = (input: string) => {
    const alphabetsRegex = /^[a-zA-Z]+$/;

    return alphabetsRegex.test(input);
  };

  /**
   ** Check if a string contains only numbers.
   *
   * @param input
   * @returns boolean
   */
  public static isNumberOnly = (input: string) => {
    const numberRegex = /^[0-9]+$/;

    return numberRegex.test(input);
  };
}

export default RegexHelper;
