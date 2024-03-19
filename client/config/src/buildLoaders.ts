import {
  LoaderDefinition,
  LoaderModule,
  LoaderOptionsPlugin,
  LoaderTargetPlugin,
  ModuleOptions,
} from "webpack";
import { BuilOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: BuilOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";
  const isProd = options.mode === "production";

  const assetLoader = {
    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
    type: "asset/resource",
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name][local]" : "[hash:base64:8]",
      },
    },
  };
  const cssLoader = {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"],
  };

  const scssLoader = {
    test: /\.s[ac]ss?$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader, // чтобы билдил стили в css файл. для более быстрой и корректной работы в браузере
      // Translates CSS into CommonJS
      isDev ? "css-loader" : cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  // const sourceMapLoader = {
  //   test: /\.js$/,
  //   enforce: "pre",
  //   use: ["source-map-loader"],
  // };

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   exclude: /node_modules/,
  //   use: [
  //     {
  //       loader: "ts-loader",
  //       // add transpileOnly option if you use ts-loader < 9.3.0
  //       options: {
  //         getCustomTransformers: () => ({
  //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //         }),
  //         //только транспилировать ts и не проверять ошибки
  //         transpileOnly: true,
  //       },
  //     },
  //   ],
  // };
  const babelLoader = {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              [
                "@babel/preset-react",
                { runtime: isDev ? "automatic" : "classic" },
              ],
            ],
          },
        },
      },
    ],
  };

  return [assetLoader, scssLoader, babelLoader, cssLoader];
}
