#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import nodemailer from "nodemailer";

// Create MCP server instance
const server = new Server(
  {
    name: "copilot-mcp-email",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Configure nodemailer transporter
// Note: For production, use environment variables for credentials
function createTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error(
      "Warning: EMAIL_USER and EMAIL_PASS environment variables not set. Email sending will fail."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser || "",
      pass: emailPass || "",
    },
  });
}

const transporter = createTransporter();

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "sendEmail",
        description: "Send an email using nodemailer",
        inputSchema: {
          type: "object",
          properties: {
            to: {
              type: "string",
              description: "Recipient email address",
            },
            subject: {
              type: "string",
              description: "Email subject",
            },
            body: {
              type: "string",
              description: "Email body content",
            },
          },
          required: ["to", "subject", "body"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "sendEmail") {
    const { to, subject, body } = request.params.arguments as {
      to: string;
      subject: string;
      body: string;
    };

    // Validate email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to send email: EMAIL_USER and EMAIL_PASS environment variables must be set. Please configure your email credentials in the .env file.",
          },
        ],
        isError: true,
      };
    }

    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body,
      });

      return {
        content: [
          {
            type: "text",
            text: `Email sent successfully! Message ID: ${info.messageId}`,
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Failed to send email: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Email Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
