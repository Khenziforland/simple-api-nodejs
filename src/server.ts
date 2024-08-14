import { AppDataSource } from "./data_source";
import { config } from "./config";
import app from "./app";
import Logging from "./helpers/logging_helper";

const startServer = () => {
  app.listen(config.app.port, () => {
    Logging.info(`Server is running on port ${config.app.port}`);
  });
};

AppDataSource.initialize()
  .then(async () => {
    Logging.info("Database connected");
    startServer();
  })
  .catch((error) => {
    Logging.error("Database connection failed");
    Logging.error(error);
  });
