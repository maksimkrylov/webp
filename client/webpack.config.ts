import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackDevServer from "webpack-dev-server";
import type {
  Configuration as DevServerConfiguration,
  Port,
} from "webpack-dev-server";
import miniCssExtractPlugin from "mini-css-extract-plugin";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuilOptions, BuildMode, BuildPaths } from "./config/build/types/types";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === "development";
  const isProd = env.mode === "production";

  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public/index.html"),
    entry: path.resolve(__dirname, "src/main.tsx"),
    src: path.resolve(__dirname, "src"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
  });
  return config;
};
