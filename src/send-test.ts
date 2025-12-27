import 'dotenv/config';

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function sendTestEmail() {
  console.log("Starting MCP Email client...");

  // Create client transport - this will spawn the MCP server
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/index.js"],
    env: process.env as Record<string, string>,
  });

  // Create MCP client
  const client = new Client(
    {
      name: "email-test-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  try {
    await client.connect(transport);
    console.log("Connected to MCP server");

    // List available tools
    const tools = await client.listTools();
    console.log("Available tools:", JSON.stringify(tools, null, 2));

    // Call sendEmail tool
    console.log("\nSending test email...");
    const result = await client.callTool({
      name: "sendEmail",
      arguments: {
        to: "srisowmyarupaputta@gmail.com",
        subject: "Test",
        body: "Hello from MCP",
      },
    });

    console.log("\nResult:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    await client.close();
  }
}

sendTestEmail().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
