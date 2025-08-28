import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page non trouvée</h1>
      <p className="mb-8 text-gray-700 text-center">
        Oups, cette page n'existe pas ou a été déplacée.
      </p>
      <button
        className="px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        onClick={() => navigate("/")}
      >
        Retour à l’accueil
      </button>
    </div>
  );
}