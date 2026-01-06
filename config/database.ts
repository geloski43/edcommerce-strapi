import path from "path";

export default ({ env }) => {
  const isProduction = env("NODE_ENV") === "production";

  // 2. Force 'postgres' for Strapi Cloud (Production)
  const client = isProduction ? "postgres" : env("DATABASE_CLIENT", "sqlite");

  return {
    connection: {
      client,
      connection:
        client === "postgres"
          ? {
              // Neon / External Postgres Logic
              connectionString: env("DATABASE_URL"),
              host: process.env.DATABASE_HOST,
              port: process.env.DATABASE_PORT,
              database: process.env.DATABASE_NAME,
              user: process.env.DATABASE_USERNAME,
              password: process.env.DATABASE_PASSWORD,

              // Critical for Neon and external providers
              ssl: process.env.DATABASE_SSL && {
                rejectUnauthorized:
                  process.env.DATABASE_SSL_REJECT_UNAUTHORIZED,
              },
            }
          : {
              // Local SQLite Logic
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
