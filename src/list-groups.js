import { createClient } from "./client.js";

// Utility: lists every group account is in with ID for env file
const { client, ready } = createClient();

ready.then(async () => {
  const chats = await client.getChats();
  const groups = chats.filter((c) => c.isGroup);

  if (groups.length === 0) {
    console.log("\nNo groups found on this account.");
  } else {
    console.log(`\nFound ${groups.length} group(s):\n`);
    for (const g of groups) {
      console.log(`  name: ${g.name}`);
      console.log(`  id:   ${g.id._serialized}\n`);
    }
    console.log("Copy the target group's id into GROUP_ID in your .env file.");
  }

  await client.destroy();
  process.exit(0);
});
