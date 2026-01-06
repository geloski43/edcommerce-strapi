import path from "path";

export default ({ env }) => {
  const isProduction = env("NODE_ENV") === "production";
  const client = isProduction ? "postgres" : env("DATABASE_CLIENT", "sqlite");

  // Debugging: This will show up in your Strapi Cloud Build/Runtime logs
  if (isProduction) {
    console.log("--- DB CONFIG DEBUG ---");
    console.log("Target Client:", client);
    console.log("Has DATABASE_URL:", !!process.env.DATABASE_URL);
    console.log("Has DATABASE_HOST:", !!process.env.DATABASE_HOST);
    console.log("-----------------------");
  }

  return {
    connection: {
      client,
      connection:
        client === "postgres"
          ? {
              // Priority 1: Use the full connection string if available
              connectionString: process.env.DATABASE_URL || env("DATABASE_URL"),
              // Priority 2: Use individual components if no string is provided
              host: process.env.DATABASE_HOST || env("DATABASE_HOST"),
              port: parseInt(
                process.env.DATABASE_PORT || env("DATABASE_PORT", "5432"),
              ),
              database: process.env.DATABASE_NAME || env("DATABASE_NAME"),
              user: process.env.DATABASE_USERNAME || env("DATABASE_USERNAME"),
              password:
                process.env.DATABASE_PASSWORD || env("DATABASE_PASSWORD"),

              // Neon / Strapi Cloud SSL requirements
              ssl: env.bool("DATABASE_SSL", true) && {
                rejectUnauthorized: env.bool(
                  "DATABASE_SSL_REJECT_UNAUTHORIZED",
                  false,
                ),
              },
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
