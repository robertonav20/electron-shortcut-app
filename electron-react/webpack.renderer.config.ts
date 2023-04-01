import type { Configuration } from "webpack";

const { IgnorePlugin } = require("webpack");
import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new IgnorePlugin({
      resourceRegExp: new RegExp(
        "^(mssql|mariasql|.*oracle.*|mysql.*|pg.*|node-pre-gyp|tedious|nock|aws-sdk|mock-aws-s3|seed)$"
      ),
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".ttf"],
  },
};
