import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AntdConfigProvider } from "./components/\bProviders/theme-config";
import LoginPage from "./pages/Login";

function App() {
  const queryClient = new QueryClient();
  return (
    <AntdConfigProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={LoginPage} />
            <Route path="/main" Component={HomePage} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AntdConfigProvider>
  );
}

export default App;
