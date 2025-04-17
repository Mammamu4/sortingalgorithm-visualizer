import "./App.css";
import SortingVisualizer from "./components/SortingVisualizer";
import { SortingAlgorithmProvider } from "./context/Visulizer";

function App() {
  return (
    <SortingAlgorithmProvider>
      <SortingVisualizer></SortingVisualizer>
    </SortingAlgorithmProvider>
  );
}

export default App;
