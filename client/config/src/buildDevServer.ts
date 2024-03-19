import WebpackDevServer from "webpack-dev-server";
import type {
  Configuration as DevServerConfiguration,
  Port,
} from "webpack-dev-server";
import { BuilOptions } from "./types/types";

export function buildDevServer(options: BuilOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true,
    historyApiFallback: true, // работает только в dev режиме
    // если раздавать статику через nginx то надо делать проксирование на Index.html
    hot: true,
    proxy:[
      {
        context: ['/api', '/image', '/profileImg'],
        target: 'http://localhost:3001',
        secure: false,
      },
    ],
  };
}
