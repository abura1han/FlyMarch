import express, { Request, Response } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fmActiveTheme, fmContents } from "./fmContents";
import { getJsxToJs } from "./readReact";

const PORT: string | number = process.env.PORT || 3000;
const app = express();

// App external plugins

app.use(express.static(path.resolve(dirname("./"), "static")));
app.use(express.static(path.resolve(dirname("./"), "static", "activeTheme")));
app.use(express.static(path.resolve(dirname("./"), "contents", "static")));

// Serve app active theme
fmActiveTheme().then((theme) => {
  app.get("/", (req: Request, res: Response) => {
    // fs.readFile(
    //   path.resolve(__dirname, "static", "activeTheme", "index.html"),
    //   "utf-8",
    //   (err, data) => {
    //     if (err) throw err;

    //     res.status(200).send(data);
    //   }
    // );

    res.status(200).sendFile("./index.html");
  });

  // 404 page not found
  app.get("*", async (req: Request, res: Response) => {
    // Convert react to js
    const jsCode = await getJsxToJs(
      path.resolve(
        dirname("./"),
        "contents",
        "themes",
        theme.dirName,
        "404.jsx"
      )
    );

    // Read index.html file and replace empty script tag to babel js code
    fs.readFile(
      `${path.resolve(
        dirname("./"),
        "contents",
        "themes",
        theme.dirName,
        "index.html"
      )}`,
      "utf-8",
      (err, htmlData) => {
        if (err) {
          throw err;
        }

        let renderToHtml = htmlData.replace(
          /<script><\/script>/,
          `<script type="module">${jsCode}</script>`
        );

        res.send(renderToHtml);
      }
    );
  });
});

// listen server
app.listen(PORT, () => {
  console.log(`<------------------------------------------------------->`);
  console.log(
    `\n|  FlyMarch server running. open http://localhost:${PORT}  |\n`
  );
  console.log(`<------------------------------------------------------->`);
});
