"use strict";
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
exports.getJsxToJs = exports.getFileData = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const core_1 = require("@babel/core");
const getFileData = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return yield promises_1.default.readFile(filePath);
});
exports.getFileData = getFileData;
const getJsxToJs = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = yield (0, exports.getFileData)(filePath);
    const codeData = yield (0, core_1.transformSync)(fileData.toString(), {
        presets: [
            "@babel/preset-react",
            "@babel/preset-env",
            "babel-preset-minify",
        ],
    });
    return codeData === null || codeData === void 0 ? void 0 : codeData.code;
});
exports.getJsxToJs = getJsxToJs;
