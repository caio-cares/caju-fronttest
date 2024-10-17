import Router from "~/router";
import { Header } from "./components/Header";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastProvider } from "./context/toast-context";

function App() {
  return (
    <PrimeReactProvider>
      <ToastProvider>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </ToastProvider>
    </PrimeReactProvider>
  );
}

export default App;
