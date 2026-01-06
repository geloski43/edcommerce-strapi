import path from "path";

export default ({ env }) => {
  const isProduction = env("NODE_ENV") === "production";

  // 1. Keep the debug logs to see exactly what is happening during Runtime
  console.log("--- STRAPI DB DEBUG START ---");
  console.log("NODE_ENV:", env("NODE_ENV"));
  console.log(
    "CLIENT_CONFIGURED:",
    isProduction ? "postgres" : env("DATABASE_CLIENT"),
  );
  console.log("HOST:", env("DATABASE_HOST"));
  console.log("DB_NAME:", env("DATABASE_NAME"));
  console.log("HAS_CONNECTION_STRING:", !!env("DATABASE_URL"));
  console.log("--- STRAPI DB DEBUG END ---");

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
