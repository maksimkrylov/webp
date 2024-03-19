import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { BuilOptions } from "./types/types";
import path from "path";
import { buildResolvers } from "./buildResolvers";

export function buildWebpack(options: BuilOptions): webpack.Configuration {
  const isDev = options.mode === "development";
  const isProd = options.mode === "production";
  const { mode, port, paths } = options;

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    devtool: isDev && "source-map",
    devServer: isDev ? buildDevServer(options) : undefined,
    resolve: buildResolvers(options),
  };
}
