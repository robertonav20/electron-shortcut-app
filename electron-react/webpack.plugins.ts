import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { IgnorePlugin } = require('webpack')

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new IgnorePlugin({ resourceRegExp: new RegExp('^(mssql|mariasql|.*oracle.*|mysql.*|pg.*|node-pre-gyp)$') })
];
