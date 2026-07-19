import { BrowserRouter } from "react-router-dom";

import { PublicRoutes } from "./public.routes";
import { PrivateRoutes } from "./private.routes";
import { useAuth } from "#hooks/useAuth";

export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
}
