# WhatsApp Bot

Sends a scheduled reminder to a WhatsApp group.

It links your WhatsApp account as a linked device on web, then posts a  
configured message to a chosen group on a recurring schedule.

### Purpose:

This project was made to automate sending reminders to my Whatsapp family group for weekly meetings.

## Requirements

- Node.js 18+ (developed on Node 23)
- A phone with WhatsApp to scan the QR code once

## Setup

1. Install dependencies:

```bash
npm install
```

```bash
npx puppeteer browsers install chrome
```

1. Create an `.env` file in the project root with the following fields.

```env
GROUP_ID=<group-id> # discovered when you run list-groups
REMINDER_MESSAGE=<reminder-message>
CRON_EXPRESSION=<cron-exp>
TIMEZONE=<timezone>
SESSION_PATH=./.wwebjs_auth
```

## Usage

### 1. Find your group's ID

```bash
npm run list-groups
```

The first run prints a QR code in the terminal. On your phone, open
**WhatsApp > Settings > Linked Devices > Link a Device** and scan it. The script then lists every
group with its stable ID (looks like `120363xxxxxxxxxxxx@g.us`). Copy your target group's ID into
`GROUP_ID` in `.env`.

The session is cached in `.wwebjs_auth/`, so you only scan the QR once.

### 2. Send a test message

```bash
npm run tes-send
```

This is a test script that posts the message immediately

### 3. Run the scheduler

```bash
npm start
```

The bot stays running and posts the message on your `CRON_EXPRESSION` schedule.

## Next steps: VPS Deployment

Next steps will be to deploy on a VPS so it can run the weekly schedule.