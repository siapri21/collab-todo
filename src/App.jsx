import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./components/AuthContext.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/Notfound.jsx";
import TodoGate from "./pages/TodoGate.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";



export default function App() {
  const auth = useAuth();
  if (!auth) return <p className="text-center mt-10">Chargement…</p>;
  const { loading } = auth;
  if (loading) return <p className="text-center mt-10">Chargement…</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/todo" element={<TodoGate />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
