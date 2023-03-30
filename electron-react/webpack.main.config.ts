import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
const { IgnorePlugin, NormalModuleReplacementPlugin } = require("webpack");

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new NormalModuleReplacementPlugin(/pg.*/, "node-noop"),
    new NormalModuleReplacementPlugin(/\.\.\/migrate/, "node-noop"),
    new NormalModuleReplacementPlugin(/\.\.\/seed/, "node-noop"),
    new IgnorePlugin({
      resourceRegExp: new RegExp(
        "^(mssql|mariasql|.*oracle.*|mysql.*|pg.*|node-pre-gyp|tedious|nock|aws-sdk|mock-aws-s3|seed)$"
      ),
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".json"],
  },
  externals: [
    "better-sqlite3",
    "pg",
    "pg-connection-string",
    "seed",
    "migrate",
  ],
};
