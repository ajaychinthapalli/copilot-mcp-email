#!/usr/bin/env node
// Simple demonstration that shows the sendEmail tool configuration
// This is a standalone demo that doesn't require email credentials

console.log("✓ MCP Email Server Implementation");
console.log("\n📧 Configured Tool: sendEmail");
console.log("\nTool Definition:");
console.log(JSON.stringify({
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
}, null, 2));

console.log("\n📝 Example Usage:");
console.log("To send the test email as specified:");
console.log(JSON.stringify({
  tool: "sendEmail",
  arguments: {
    to: "srisowmyarupaputta@gmail.com",
    subject: "Test",
    body: "Hello from MCP"
  }
}, null, 2));

console.log("\n🚀 How to use:");
console.log("1. Set up environment variables in .env file:");
console.log("   EMAIL_USER=your-email@gmail.com");
console.log("   EMAIL_PASS=your-app-password");
console.log("\n2. Run the MCP server:");
console.log("   npm start");
console.log("\n3. Or send the test email directly:");
console.log("   npm run send-test");

console.log("\n✅ Implementation Complete!");

