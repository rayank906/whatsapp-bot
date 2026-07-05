import { config, assertTarget } from "./config.js";
import { createClient } from "./client.js";

// One-shot send: connect, post the reminder once, then exit.
// Use this to test end-to-end without waiting for the schedule.
assertTarget();

const { client, ready } = createClient();

ready.then(async () => {
  try {
    await client.sendMessage(config.groupId, config.message);
    console.log(`[${new Date().toISOString()}] Test message sent to ${config.groupId}.`);
    await new Promise(resolve => setTimeout(resolve, 5000));
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Failed to send:`, err);
    process.exitCode = 1;
  } finally {
    await client.destroy();
    process.exit(process.exitCode ?? 0);
  }
});
