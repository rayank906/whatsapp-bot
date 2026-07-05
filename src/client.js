import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { config } from "./config.js";

const { Client, LocalAuth } = pkg;

// creates Whatsapp client
export function createClient() {
  const client = new Client({
    authStrategy: new LocalAuth({ dataPath: config.sessionPath }),
    puppeteer: {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  });

  client.on("qr", (qr) => {
    console.log(
      "\nScan this QR code in WhatsApp > Settings > Linked Devices > Link a Device:\n"
    );
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", () => {
    console.log("Authenticated. Session saved for next time.");
  });

  client.on("auth_failure", (msg) => {
    console.error("Authentication failed:", msg);
  });

  client.on("disconnected", (reason) => {
    console.warn("Client was disconnected:", reason);
  });

  const ready = new Promise((resolve) => {
    client.on("ready", () => {
      console.log("WhatsApp client is ready.");
      resolve(client);
    });
  });

  client.initialize();

  return { client, ready };
}

// finds chat id
export async function resolveGroupId(client) {
  if (config.groupId) return config.groupId;

  const chats = await client.getChats();
  const group = chats.find(
    (c) => c.isGroup && c.name?.toLowerCase() === config.groupName.toLowerCase()
  );

  if (!group) {
    throw new Error(
      `Could not find a group named "${config.groupName}". ` +
        'Run "npm run list-groups" to see available groups and set GROUP_ID instead.'
    );
  }

  return group.id._serialized;
}
