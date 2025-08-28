import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext.jsx";
import AppShell from "../components/AppShell.jsx";

export default function TodoGate() {
  const { user, login } = useAuth() || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/app", { replace: true });
  }, [user, navigate]);

  return (
    <AppShell>
      <section className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-extrabold">Accéder à votre Todo-list</h1>
          <p className="text-gray-700 mt-2">Connectez-vous pour voir vos tâches.</p>

          <button
            onClick={login}
            className="mt-6 h-12 px-6 rounded-xl bg-blue-700 text-white hover:bg-blue-800"
          >
            Se connecter
          </button>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border bg-white/80 backdrop-blur p-4">
              <div className="font-semibold mb-1">Temps réel</div>
              <p className="text-sm text-gray-600">Collaborez instantanément.</p>
            </div>
            <div className="rounded-2xl border bg-white/80 backdrop-blur p-4">
              <div className="font-semibold mb-1">Sécurisé</div>
              <p className="text-sm text-gray-600">Auth Google fiable.</p>
            </div>
            <div className="rounded-2xl border bg-white/80 backdrop-blur p-4">
              <div className="font-semibold mb-1">Responsive</div>
              <p className="text-sm text-gray-600">Confort mobile et desktop.</p>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
