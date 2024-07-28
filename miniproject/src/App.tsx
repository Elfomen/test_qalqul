import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/NavBar/Nav";
import { appRoutes } from "./routes";
import Home from "./screen/Home";
import TextEditor from "./screen/TextEditor/TextEditor";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={appRoutes.home} element={<Nav />}>
            <Route index element={<Home />} />
            <Route path={appRoutes.document} element={<TextEditor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
