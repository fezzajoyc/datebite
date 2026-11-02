import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MCP_TOOLS } from "./tools";

/**
 * DateBite MCP server(stdio):把站上日期/时间工具背后的纯函数逻辑
 * 暴露为 AI 可执行工具。人和 AI 用同一份经过测试的实现。
 *
 * 构建后运行:npx datebite-mcp(或 node mcp/dist/server.mjs)
 */

export function createServer() {
  const server = new McpServer(
    { name: "datebite", version: "1.0.0" },
    {
      instructions:
        "DateBite: date & time calculators (https://datebite.app). These executable tools run the same tested logic as the website. All dates are ISO YYYY-MM-DD and computed in whole UTC days, so daylight saving never shifts a result. Ages and date differences use calendar months (a month from 31 January is 28/29 February); workdays endpoints are inclusive when counting and the start is not consumed when adding. Sleep schedules assume 90-minute cycles plus 15 minutes to fall asleep — an anchor, not medical advice.",
    },
  );

  for (const tool of MCP_TOOLS) {
    server.registerTool(tool.name, {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.schema,
    }, async (args) => {
      try {
        return tool.run(args ?? {});
      } catch (e) {
        return {
          content: [{ type: "text" as const, text: `error: ${(e as Error).message}` }],
          isError: true,
        };
      }
    });
  }
  return server;
}

export async function runStdio() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
  // stdio 模式下保持进程存活;stderr 可写日志(stdout 是协议通道)
  console.error(`datebite MCP server: ${MCP_TOOLS.length} tools ready`);
}

if (process.argv[1] && process.argv[1].includes("server")) {
  void runStdio();
}
