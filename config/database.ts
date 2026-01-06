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
              host: env("DATABASE_HOST"),
              port: env.int("DATABASE_PORT", 5432),
              database: env("DATABASE_NAME"),
              user: env("DATABASE_USERNAME"),
              password: env("DATABASE_PASSWORD"),

              // Critical for Neon and external providers
              ssl: env.bool("DATABASE_SSL", true) && {
                rejectUnauthorized: env.bool(
                  "DATABASE_SSL_REJECT_UNAUTHORIZED",
                  false,
                ),
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
