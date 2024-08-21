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
const axios_1 = __importDefault(require("axios"));
const Modal = ({ isCorrect, guesses, setting, score, solution, turn }) => {
    const [formData, setFormData] = (0, react_1.useState)({ Name: '' });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => (Object.assign(Object.assign({}, prevData), { [name]: value })));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const currentStartTime = new Date().toISOString();
        const data = {
            Name: formData.Name,
            startTime: setting.startTime,
            endTime: currentStartTime,
            guesses: guesses,
            score,
            letterCount: parseInt(setting.letterCount),
            letterRepeat: `${setting.letterRepeat}`
        };
        axios_1.default.post('http://localhost:5080/v1/score', data).then(function () {
            window.location.reload();
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    return (<div className="modal">
      {isCorrect ? (<div>
          <h1>Congrats, You Won!</h1>
          <p className="solution">{solution}</p>
          <p>You found the word in {turn} guesses</p>
          <p>Score: {score}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Name">Name</label>
            <input type="text" id="letterCount" name="Name" value={formData.Name} onChange={handleChange} required/>
            <br />
            <button type="submit">Submit</button>
          </form> 
        </div>) : (<div>
          <h1>Sorry, you lost</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>)}
    </div>);
};
exports.default = Modal;
