"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const components_1 = require("./components");
function ErrorPage() {
    const error = (0, react_router_dom_2.useRouteError)();
    console.error(error);
    return (<div id="error-page">
      <h2>Oops!</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>);
}
const Routes = () => {
    const router = (0, react_router_dom_1.createBrowserRouter)([
        {
            path: "/",
            element: <components_1.Layout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: <components_1.Game />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "/about",
                    element: <components_1.About />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "/score",
                    element: <components_1.Score />,
                    errorElement: <ErrorPage />,
                },
            ],
        },
    ]);
    return <react_router_dom_1.RouterProvider router={router}/>;
};
exports.default = Routes;
