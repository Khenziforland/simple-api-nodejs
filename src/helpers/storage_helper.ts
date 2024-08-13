import { S3 } from "@aws-sdk/client-s3";
import { DateTime } from "luxon";
import { createReadStream } from "fs";

import FileUploadHelper from "./file_upload_helper";
import { config } from "../config";

const s3Client = new S3({
  credentials: {
    accessKeyId: config.s3.accessKey ?? "",
    secretAccessKey: config.s3.secretKey ?? "",
  },
  endpoint: config.s3.endpoint ?? "",
  region: config.s3.region ?? "",
  forcePathStyle: true,
});

class StorageHelper {
  /**
   ** Get url file
   *
   * @param filename
   * @param folder
   * @returns string
   */
  public static getUrlFile = (filename: string, folder: string) => {
    return config.s3.endpoint + "/" + config.s3.bucket + "/" + config.s3.root + "/" + folder + "/" + filename;
  };

  /**
   ** Upload file to S3
   *
   * @param file
   * @param folder
   * @returns object
   */
  public static uploadFile = async (file: any, folder: string) => {
    let status = true;

    const extension = FileUploadHelper.getExtension(file);
    const filename = DateTime.now().toFormat("yyyyLLddHHmmss") + Math.random().toString(36).slice(2) + extension;
    const destinationFile = config.s3.root + "/" + folder + "/" + filename;
    const fileStream = createReadStream(file.path);

    try {
      await s3Client.putObject({
        Bucket: config.s3.bucket,
        Key: destinationFile,
        ACL: "public-read",
        Body: fileStream,
      });
    } catch (err) {
      status = false;
    }

    const result = {
      status: status,
      filename: filename,
    };

    return result;
  };

  /**
   ** Delete file
   *
   * @param filename
   * @param folder
   * @returns object
   */
  public static deleteFile = async (filename: string, folder: string) => {
    let status = true;
    let isFileExists = true;

    try {
      await s3Client.headObject({
        Bucket: config.s3.bucket,
        Key: config.s3.root + "/" + folder + "/" + filename,
      });
    } catch (err) {
      isFileExists = false;
    }

    if (isFileExists) {
      try {
        await s3Client.deleteObject({
          Bucket: config.s3.bucket,
          Key: config.s3.root + "/" + folder + "/" + filename,
        });
      } catch (err) {
        status = false;
      }
    }

    const result = {
      status: status,
    };

    return result;
  };
}

export default StorageHelper;
