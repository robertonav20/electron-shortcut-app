import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
const path = require('path')

const config: ForgeConfig = {
  packagerConfig: {
    icon: path.join(__dirname, './src/public/favicon.ico'),
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({
    iconUrl: path.join(__dirname, './src/public/favicon.ico'),
    setupIcon: path.join(__dirname, './src/public/favicon.ico')
  }), new MakerZIP({}, ['linux'])],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/public/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
        nodeIntegration: true
      },
    }),
  ],
};

export default config;
