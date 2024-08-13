import Hashids from "hashids";
import { config } from "../config";

class HashHelper {
  /**
   ** Encode value to hash.
   *
   * @param value
   * @returns string
   */
  public static encode = (value: any) => {
    const hashids = new Hashids("", config.hash.hashLength, config.hash.hashAlphabet);
    return hashids.encode(value);
  };

  /**
   ** Decode hash to value.
   *
   * @param value
   * @returns string
   */
  public static decode = (value: any) => {
    const hashids = new Hashids("", config.hash.hashLength, config.hash.hashAlphabet);
    let result = [];

    try {
      result = hashids.decode(value);
    } catch (err) {
      return 0;
    }

    if (result.length == 0) {
      return 0;
    }

    return Number(result[0]);
  };
}

export default HashHelper;
