import fs from "fs/promises";
import { transformSync } from "@babel/core";

export const getFileData = async (filePath: string): Promise<Buffer> => {
  return await fs.readFile(filePath);
};

export const getJsxToJs = async (
  filePath: string
): Promise<string | null | undefined> => {
  const fileData = await getFileData(filePath);

  const codeData = await transformSync(fileData.toString(), {
    presets: [
      "@babel/preset-react",
      "@babel/preset-env",
      "babel-preset-minify",
    ],
  });

  return codeData?.code;
};
