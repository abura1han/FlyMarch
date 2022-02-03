import fs from "fs/promises";
import path, { dirname } from "path";
import { Contents, Theme } from "./fmContents.d";
const contentPath = path.resolve(dirname("./"), "contents", "contents.json");

export const fmContents = async (): Promise<Contents> => {
  const data = await fs.readFile(contentPath, "utf-8");
  return JSON.parse(data);
};

// Get active theme
export const fmActiveTheme = async (): Promise<Theme> => {
  const activeTheme = await fs.readFile(contentPath, "utf-8");
  const { themes } = JSON.parse(activeTheme);
  return themes.find((theme: Theme) => theme.activeTheme);
};
