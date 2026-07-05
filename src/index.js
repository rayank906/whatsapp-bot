import cron from "node-cron";
import { config, assertTarget } from "./config.js";
import { createClient } from "./client.js";
assertTarget();

if (!cron.validate(config.cronExpression)) {
  throw new Error(
    `Invalid CRON_EXPRESSION: "${config.cronExpression}". ` +
      "Expected 5 fields: minute hour day-of-month month day-of-week."
  );
}

const { client, ready } = createClient();

async function sendReminder() {
  try {
    await client.sendMessage(config.groupId, config.message);
    console.log(`[${new Date().toISOString()}] Reminder sent to ${config.groupId}.`);
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] Failed to send reminder:`,
      err
    );
  }
}

// cron schedule
ready.then(() => {
  cron.schedule(config.cronExpression, sendReminder, {
    timezone: config.timezone,
  });

  console.log(
    `Scheduled reminder with cron "${config.cronExpression}" (timezone: ${config.timezone}).`
  );
  console.log("Bot is running. Keep this process alive. Press Ctrl+C to stop.");
});


async function shutdown(signal) {
  console.log(`\nReceived ${signal}, shutting down...`);
  try {
    await client.destroy();
  } finally {
    process.exit(0);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
