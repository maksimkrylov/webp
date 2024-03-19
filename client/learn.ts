import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackDevServer  from 'webpack-dev-server'
import type { Configuration as DevServerConfiguration, Port } from "webpack-dev-server";


type Mode = 'production' | 'development'

interface EnvVariables {
  mode: Mode, 
  port: Port
}

export default (env: EnvVariables) => {
  
  const isDev = env.mode === 'development'
  
  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js', // чтобы браузер не кэшировал файлы
      clean: true // удалять старые сборки и заменять их
    },
    module: { /// loader-ы обрабатывают файлы с расширениями 
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS 
            // позволяет импортировать и использовать стили в JavaScript-коде 
            // с помощью специальных инструкций require() или import
            // модульная работа со стилями в js приложениях
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ]
        },
        {
          //  ts-loader умеет обрабатывать jsx
          // для js нужен babel-loader
          test: /\.tsx?$/,  
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: { // чтобы при импорте не писать расширения
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isDev && 'inline-source-map', // трекинг ошибок
    devServer:  isDev ? {  // билдит и перезапускает  сервер при изменении кода
      port: env.port ?? 3000,
      open: true
    } : undefined,
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public/index.html') }), // подключает скрипты к файлу хтмл
    ],
  }
  return config
}