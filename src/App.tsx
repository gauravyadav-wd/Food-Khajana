import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import RecipeDetail from "./components/RecipeDetail";
import Login from "./components/Login";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [apiKey, setApiKey] = useState<string | null>("");

  const handleApiKey = function (val: string) {
    setApiKey(val);
  };

  useEffect(() => {
    const apiKeyLocalStorage = localStorage.getItem("apiKey");
    setApiKey(apiKeyLocalStorage);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              apiKey ? <Homepage /> : <Login handleApiKey={handleApiKey} />
            }
          />
          <Route path="/:id" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
