const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8000";
const secret = process.env.SYNC_SECRET;

export default {
  // TASK 1: Sync Categories
  syncCategories: {
    task: async () => {
      console.log("[CRON] Attempting Category sync...");
      try {
        const response = await fetch(`${frontendUrl}/api/sync/categories`, {
          method: "GET", // Explicitly define method
          headers: { "x-sync-secret": secret },
        });

        if (!response.ok) {
          console.error(
            `[CRON ERROR] Categories: Server responded with ${response.status}`,
          );
          return;
        }

        console.log("[CRON] Category sync triggered successfully.");
      } catch (error) {
        // This catch block prevents Strapi from shutting down on network/fetch errors
        console.error(
          "[CRON ERROR] Category sync failed to connect:",
          error.message,
        );
      }
    },
    options: {
      //rule: "*/3 * * * *", // Every 3 minutes
      rule: "30 0 * * *", // 12:30 AM
    },
  },

  // TASK 2: Sync Sub-Categories
  syncSubCategories: {
    task: async () => {
      console.log("[CRON] Attempting Sub-Category sync...");
      try {
        const response = await fetch(`${frontendUrl}/api/sync/subcategories`, {
          method: "GET", // Explicitly define method
          headers: { "x-sync-secret": secret },
        });

        if (!response.ok) {
          console.error(
            `[CRON ERROR] Sub-Categories: Server responded with ${response.status}`,
          );
          return;
        }

        console.log("[CRON] Sub-Category sync triggered successfully.");
      } catch (error) {
        // This catch block prevents Strapi from shutting down on network/fetch errors
        console.error(
          "[CRON ERROR] Sub-Category sync failed to connect:",
          error.message,
        );
      }
    },
    options: {
      //rule: "*/5 * * * *", // Every 5 minutes
      rule: "30 0 * * *", // 12:30 AM
    },
  },

  // TASK 3: Sync Products
  syncProducts: {
    task: async () => {
      console.log("[CRON] Attempting Product sync...");
      try {
        const response = await fetch(`${frontendUrl}/api/sync/products`, {
          method: "GET",
          headers: { "x-sync-secret": secret },
        });

        if (!response.ok) {
          console.error(
            `[CRON ERROR] Products: Server responded with ${response.status}`,
          );
          return;
        }

        console.log("[CRON] Product sync triggered successfully.");
      } catch (error) {
        console.error(
          "[CRON ERROR] Product sync failed to connect:",
          error.message,
        );
      }
    },
    options: {
      rule: "*/2 * * * *", // Every 7 minutes
      // rule: "30 0 * * *", // 12:30 AM
    },
  },
};
