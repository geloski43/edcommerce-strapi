import path from "path";

export default ({ env }) => {
  const isProduction = env("NODE_ENV") === "production";
  const client = isProduction ? "postgres" : env("DATABASE_CLIENT", "sqlite");

  return {
    connection: {
      client,
      connection:
        client === "postgres"
          ? {
              // Priority 1: Use the URL string directly
              connectionString: env("DATABASE_URL"),
              // SSL is required for Neon
              ssl: { rejectUnauthorized: false },
            }
          : {
              filename: path.join(
                __dirname,
                "..",
                "..",
                env("DATABASE_FILENAME", ".tmp/data.db"),
              ),
            },
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
