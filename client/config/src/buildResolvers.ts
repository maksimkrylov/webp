import { Configuration } from "webpack";
import { BuilOptions } from "./types/types";

export function buildResolvers(options: BuilOptions): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": options.paths.src
    },
  };
}
