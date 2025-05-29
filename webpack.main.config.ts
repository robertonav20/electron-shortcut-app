import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
const { NormalModuleReplacementPlugin } = require("webpack");

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
    new NormalModuleReplacementPlugin(/pg/, "node-noop"),
    new NormalModuleReplacementPlugin(/pg-connection-string/, "node-noop"),
    new NormalModuleReplacementPlugin(/pg-native/, "node-noop"),
    new NormalModuleReplacementPlugin(/mssql/, "node-noop"),
    new NormalModuleReplacementPlugin(/mariasql/, "node-noop"),
    new NormalModuleReplacementPlugin(/oracledb/, "node-noop"),
    new NormalModuleReplacementPlugin(/mysql/, "node-noop"),
    new NormalModuleReplacementPlugin(/mysql2/, "node-noop"),
    new NormalModuleReplacementPlugin(/tedious/, "node-noop"),
    new NormalModuleReplacementPlugin(/nock/, "node-noop"),
    new NormalModuleReplacementPlugin(/aws-sdk/, "node-noop"),
    new NormalModuleReplacementPlugin(/mock-aws-s3/, "node-noop"),
    new NormalModuleReplacementPlugin(/\.\.\/migrate/, "node-noop"),
    new NormalModuleReplacementPlugin(/\.\.\/seed/, "node-noop"),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".json"],
  },
  // Comment this line when you want generate package
  // externals: ["better-sqlite3", "sqlite3", "knex"]
};
