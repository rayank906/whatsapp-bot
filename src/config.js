import "dotenv/config";

function required(value, name) {
  if (!value || value.trim() === "") {
    throw new Error(
      `Missing config: ${name}. Set it in your .env file (copy .env.example to .env).`
    );
  }
  return value.trim();
}

export const config = {
  groupId: process.env.GROUP_ID?.trim() || "",
  message: required(process.env.REMINDER_MESSAGE, "REMINDER_MESSAGE"),
  cronExpression: process.env.CRON_EXPRESSION?.trim() || "0 10 * * 6",
  timezone: process.env.TIMEZONE?.trim() || "UTC",
  // cache Whatsapp session
  sessionPath: process.env.SESSION_PATH?.trim() || "./.wwebjs_auth",
  // optional explicit Chromium/Chrome binary; empty = use Puppeteer's own
  chromePath:
    process.env.CHROME_PATH?.trim() ||
    process.env.PUPPETEER_EXECUTABLE_PATH?.trim() ||
    "",
};

export function assertTarget() {
  if (!config.groupId) {
    throw new Error(
      "You must set GROUP_ID in your .env file. " +
        'Run "npm run list-groups" to discover your group\'s ID.'
    );
  }
}
