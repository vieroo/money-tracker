import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster theme="light" />
    </AuthProvider>
  );
}

export default App;
