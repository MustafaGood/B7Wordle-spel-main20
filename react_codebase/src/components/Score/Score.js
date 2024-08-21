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
const Score = () => {
    const [data, setData] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        axios_1.default.get('http://localhost:5080/v1/score')
            .then(response => {
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                const sortedData = [...response.data.data].sort((a, b) => b.score - a.score);
                setData(sortedData);
            }
            else {
                console.error('Invalid response data:', response.data);
            }
        })
            .catch(error => {
            console.log(error);
        });
    }, []); // Empty dependency array to run only once
    return (<div className='list'>
      <div className='listItem'>
        <p>Name</p>
        <p>Score</p>
        <p>Letter Count</p>
      </div>
      {data.map((D) => (<div key={D._id} className='listItem'>
          <p>{D.Name}</p>
          <p>{D.score}</p>
          <p>{D.letterCount}</p>
        </div>))}
    </div>);
};
exports.default = Score;
