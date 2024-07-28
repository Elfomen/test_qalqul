import { Provider } from "react-redux";
import store from "./store/store";
import TaskList from "./screens/TaskList";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TaskList />
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
