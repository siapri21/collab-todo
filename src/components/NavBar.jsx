import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function NavBar() {
  const { user, login, logout } = useAuth() || {};
  const navigate = useNavigate();

  const goTodo = () => navigate(user ? "/app" : "/todo"); // au clic


  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 h-12 rounded-full   backdrop-blur flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="w-2.5 h-2.5 bg-blue-700 rounded-full" />
            <span>Todo Collab</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:underline">Accueil</Link>
            <button onClick={goTodo} className="hover:underline">Todo-list</button>

            {!user ? (
              <button
                onClick={login}
                className="flex items-center gap-2 h-8 px-3 rounded-full bg-blue-700 text-white"
                title="Se connecter"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14z"/>
                </svg>
                Login
              </button>
            ) : (
              <button onClick={logout} className="h-8 px-3 rounded-full border">
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
