import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import { FrontPage } from "./components/ForntPage";
import { Button } from "./components/Button";
import Loader from "./components/loader";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/frontpage" element={<FrontPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchCatImages();

      if (response.ok) {
        navigate("/frontpage");
      } else {
        throw new Error("Failed to fetch images");
      }
    } catch (error) {
      setError("An error occurred while fetching images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      {loading ? (
        <Loader />
      ) : (
        <Button
          onClick={handleButtonClick}
          className="bg-blue-500 text-black font-bold py-2 px-4 rounded hover:bg-blue-700 hover:text-white transition duration-300"
        >
          Fetch the Cat Images
        </Button>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}{" "}
    </div>
  );
};

const fetchCatImages = () => {
  return new Promise<{ ok: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ ok: true });
    }, 2000);
  });
};

export default App;
