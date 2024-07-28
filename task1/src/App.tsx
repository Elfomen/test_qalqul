import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import UserDetails from "./components/UserDetails";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";

function App() {
  const queryClient = new QueryClient();
  const [id, setId] = useState<number>();
  return (
    <QueryClientProvider client={queryClient}>
      <Stack gap={4}>
        <TextField
          type="number"
          onChange={(e) => setId(parseInt(e.target.value))}
          value={id}
          label="User id"
        />
        {!id ? <span>Please Enter an id above</span> : <UserDetails id={id} />}
      </Stack>
    </QueryClientProvider>
  );
}

export default App;
