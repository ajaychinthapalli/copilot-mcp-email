# copilot-mcp-email

MCP (Model Context Protocol) server for sending emails using nodemailer.

## Features

- Implements `sendEmail` tool for sending emails via MCP protocol
- Uses nodemailer for email delivery
- Supports Gmail and other SMTP services

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your email credentials:
```bash
cp .env.example .env
```

Edit `.env` and add your Gmail credentials:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail App Password (generate at https://myaccount.google.com/apppasswords)

3. Build the project:
```bash
npm run build
```

## Usage

### Verify Installation

To verify the MCP server is properly configured:
```bash
npm run verify
```

This will display the sendEmail tool configuration and usage instructions.

### As an MCP Server

Run the server:
```bash
npm start
```

The server runs on stdio and exposes the `sendEmail` tool with the following parameters:
- `to` (string): Recipient email address
- `subject` (string): Email subject
- `body` (string): Email body content

### Send Test Email

To send a test email to srisowmyarupaputta@gmail.com:
```bash
npm run send-test
```

This will send an email with:
- To: srisowmyarupaputta@gmail.com
- Subject: Test
- Body: Hello from MCP

## MCP Tool Schema

```json
{
  "name": "sendEmail",
  "description": "Send an email using nodemailer",
  "inputSchema": {
    "type": "object",
    "properties": {
      "to": {
        "type": "string",
        "description": "Recipient email address"
      },
      "subject": {
        "type": "string",
        "description": "Email subject"
      },
      "body": {
        "type": "string",
        "description": "Email body content"
      }
    },
    "required": ["to", "subject", "body"]
  }
}
```