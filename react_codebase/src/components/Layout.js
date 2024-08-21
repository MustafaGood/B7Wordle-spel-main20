"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Layout = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className='layout'>
      <h1>
        Wordle Game
        <button onClick={() => navigate('/')}>Game</button>
        <button onClick={() => navigate('/score')}>Score</button>
        <button onClick={() => navigate('/about')}>About</button>
      </h1>
      <react_router_dom_1.Outlet />
    </div>);
};
exports.default = Layout;
