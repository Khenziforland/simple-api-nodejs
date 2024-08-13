import dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    baseUrl: process.env.APP_BASE_URL + ":" + process.env.PORT ?? "localhost:8000",
    port: Number(process.env.PORT) ?? 8000,
  },

  jwt: {
    secretKey: process.env.JWT_SECRET_KEY ?? "",
  },

  database: {
    connection: process.env.DB_CONNECTION ?? "",
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT) ?? 3306,
    database: process.env.DB_DATABASE ?? "",
    username: process.env.DB_USERNAME ?? "",
    password: process.env.DB_PASSWORD ?? "",
  },

  hash: {
    hashAlphabet: process.env.HASH_ALPHABET ?? "",
    hashLength: Number(process.env.HASH_LENGTH) ?? 20,
  },

  s3: {
    accessKey: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    endpoint: process.env.AWS_ENDPOINT ?? "",
    usePathStyleEndpoint: process.env.AWS_USE_PATH_STYLE_ENDPOINT ?? true,
    bucket: process.env.AWS_BUCKET ?? "",
    region: process.env.AWS_DEFAULT_REGION ?? "",
    root: process.env.AWS_ROOT ?? "",
    visibility: process.env.AWS_VISIBILITY ?? "public",
  },
};