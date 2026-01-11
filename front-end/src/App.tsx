import { Outlet } from "react-router";
import { ToastProvider } from "@/contexts/ToastContext";
import { Header } from "@/components/Header";

function App() {
  return (
    <ToastProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </ToastProvider>
  );
}

export default App;
