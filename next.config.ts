import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: { root: import.meta.dirname },
  // 全站纯客户端工具 + SSG,无任何自持 API。重库(pdf.js / tesseract / heic2any …)
  // 一律在工具组件内 await import() 动态加载,主包保持精简。
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
