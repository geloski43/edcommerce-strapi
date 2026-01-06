// import type { Core } from '@strapi/strapi';
import cronTasks from "../config/cron-tasks";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // This tells Strapi to load your cron tasks

    console.log("########## RUNTIME DATABASE CHECK ##########");
    console.log("DB Host:", process.env.DATABASE_HOST);
    console.log("DB Name:", process.env.DATABASE_NAME);
    console.log("DB Client:", process.env.DATABASE_CLIENT);
    console.log("Using Connection String:", !!process.env.DATABASE_URL);
    console.log("############################################");
    strapi.cron.add(cronTasks);
  },
};
