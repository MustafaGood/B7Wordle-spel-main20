"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Wordle_1 = __importDefault(require("./components/Wordle"));
const IntroModal_1 = __importDefault(require("./components/IntroModal"));
const Game = () => {
    const [solution, setSolution] = (0, react_1.useState)(null);
    const [modal, setModal] = (0, react_1.useState)(false);
    const [setting, setSetting] = (0, react_1.useState)({
        letterCount: '',
        letterRepeat: false,
        startTime: '',
    });
    (0, react_1.useEffect)(() => {
        setModal(true);
    }, []);
    return (<div className="Game">
      {solution && <Wordle_1.default solution={solution} setting={setting}/>}
      {modal && (<IntroModal_1.default setSolution={setSolution} setSetting={setSetting} setting={setting} setModal={setModal}/>)}
    </div>);
};
exports.default = Game;
