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
  // groupName is only for fallback
  groupId: process.env.GROUP_ID?.trim() || "",
  groupName: process.env.GROUP_NAME?.trim() || "",
  message: required(process.env.REMINDER_MESSAGE, "REMINDER_MESSAGE"),
  cronExpression: process.env.CRON_EXPRESSION?.trim() || "0 10 * * 6",
  timezone: process.env.TIMEZONE?.trim() || "UTC",
  // cache Whatsapp session
  sessionPath: process.env.SESSION_PATH?.trim() || "./.wwebjs_auth",
};

export function assertTarget() {
  if (!config.groupId && !config.groupName) {
    throw new Error(
      "You must set either GROUP_ID or GROUP_NAME in your .env file. " +
        'Run "npm run list-groups" to discover your group\'s ID.'
    );
  }
}
