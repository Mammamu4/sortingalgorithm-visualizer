import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SortingVisualizer from "./components/SortingVisualizer";
import { SortingAlgorithmProvider } from "./context/Visulizer";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SortingAlgorithmProvider>
              <SortingVisualizer></SortingVisualizer>
            </SortingAlgorithmProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
