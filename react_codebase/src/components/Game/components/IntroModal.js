"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const IntroModal = ({ setSolution, setting, setSetting, setModal }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSetting((prevData) => (Object.assign(Object.assign({}, prevData), { [name]: type === 'checkbox' ? checked : value })));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const currentStartTime = new Date().toISOString();
        const updatedSettings = Object.assign(Object.assign({}, setting), { startTime: currentStartTime });
        setSetting(updatedSettings);
        axios_1.default.post('http://localhost:5080/v1/word', {
            letterCount: parseInt(setting.letterCount),
            repeated: `${setting.letterRepeat}`,
        })
            .then(response => {
            setSolution(response.data.word);
        })
            .catch(error => {
            console.log(error);
        });
        setModal(false);
    };
    return (<div className="modal">
      <div>
        <h1>Welcome to wordle input your setting</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="letterCount">Letter Count</label>
          <input type="number" id="letterCount" name="letterCount" value={setting.letterCount} onChange={handleChange} required/>
          <br />
          <label htmlFor="letterRepeat">
            <input type="checkbox" id="letterRepeat" name="letterRepeat" checked={setting.letterRepeat} onChange={handleChange}/>
            Letter Repeat
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>);
};
exports.default = IntroModal;
