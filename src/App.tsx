import "./App.css";

import { Dashboard } from "./components/Dashboard";
import { BudgetProvider } from "./context/BudegtContext";

function App() {
  return (
    <BudgetProvider>
      <Dashboard />
    </BudgetProvider>
  );
}

export default App;
