import path from "path";

class FileUploadHelper {
  /**
   ** Get file extension.
   *
   * @param file
   * @returns string.
   */
  public static getExtension = (file: any) => {
    const extension = path.extname(file.name).toLowerCase();

    return extension;
  };

  /**
   ** Check if file is an image.
   *
   * @param file
   * @returns boolean.
   */
  public static isImage = (file: any) => {
    const extension = path.extname(file.name).toLowerCase();

    const imageExtensions = [".jpg", ".jpeg", ".png"];

    return imageExtensions.includes(extension);
  };

  /**
   ** Check if file is a Microsoft Excel file.
   *
   * @param file
   * @returns boolean.
   */
  public static isMsExcelFile = (file: any) => {
    const extension = path.extname(file.name).toLowerCase();
    const excelExtensions = [".xls", ".xlsx"];

    return excelExtensions.includes(extension);
  };

  /**
   ** Check if file is a Microsoft Word file.
   *
   * @param file
   * @returns boolean.
   */
  public static isMsWord = (file: any) => {
    const extension = path.extname(file.name).toLowerCase();
    const wordExtensions = [".doc", ".docx"];

    return wordExtensions.includes(extension);
  };

  /**
   ** Check if file is a PDF file.
   *
   * @param file
   * @returns boolean.
   */
  public static isPdf = (file: any) => {
    const extension = path.extname(file.name).toLowerCase();

    const pdfExtensions = [".pdf"];

    return pdfExtensions.includes(extension);
  };

  /**
   ** Check if file size is within the accepted range.
   *
   * @param file
   * @param maxSize
   * @returns boolean.
   */
  public static isFileSizeAccepted = (file: any, maxSize: number = 10000000) => {
    const fileSize = file.size;

    return fileSize <= maxSize;
  };
}

export default FileUploadHelper;
