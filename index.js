"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importStar(require("path"));
const fmContents_1 = require("./fmContents");
const readReact_1 = require("./readReact");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// App external plugins
app.use(express_1.default.static(path_1.default.resolve((0, path_1.dirname)("./"), "static")));
app.use(express_1.default.static(path_1.default.resolve((0, path_1.dirname)("./"), "static", "activeTheme")));
app.use(express_1.default.static(path_1.default.resolve((0, path_1.dirname)("./"), "contents", "static")));
// Serve app active theme
(0, fmContents_1.fmActiveTheme)().then((theme) => {
    app.get("/", (req, res) => {
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
    app.get("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Convert react to js
        const jsCode = yield (0, readReact_1.getJsxToJs)(path_1.default.resolve((0, path_1.dirname)("./"), "contents", "themes", theme.dirName, "404.jsx"));
        // Read index.html file and replace empty script tag to babel js code
        fs_1.default.readFile(`${path_1.default.resolve((0, path_1.dirname)("./"), "contents", "themes", theme.dirName, "index.html")}`, "utf-8", (err, htmlData) => {
            if (err) {
                throw err;
            }
            let renderToHtml = htmlData.replace(/<script><\/script>/, `<script type="module">${jsCode}</script>`);
            res.send(renderToHtml);
        });
    }));
});
// listen server
app.listen(PORT, () => {
    console.log(`<------------------------------------------------------->`);
    console.log(`\n|  FlyMarch server running. open http://localhost:${PORT}  |\n`);
    console.log(`<------------------------------------------------------->`);
});
