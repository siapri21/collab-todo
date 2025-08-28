import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext.jsx";
import NavBar from "../components/NavBar.jsx";
// imports
import { Sparkles, Target /* Rocket, Sparkles */ } from "lucide-react";
// choisis l’icône ici
const OneClickIcon = Sparkles;
const TwoClickIcon = Target; // ou Rocket, ou Sparkles


export default function Landing() {
  const auth = useAuth();
  const navigate = useNavigate();

  


  useEffect(() => {
    if (auth?.user) navigate("/app", { replace: true });
  }, [auth?.user, navigate]);

  // const handleLogin = async () => {
  //   if (auth?.login) {
  //     await auth.login();
  //     navigate("/app");
  //   }
  // };

  if (auth?.user) return null;

  return (
    <div className="min-h-screen w-full relative bg-white">
      <NavBar />

      {/* Warm Orange Glow Top – inchangé */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top center,
              rgba(255, 140, 60, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Contenu centré */}
      <main className="relative z-10">
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 text-sm border rounded-full px-3 py-1 bg-white/70 backdrop-blur">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              <span>Nouvelle version</span>
              <span>•</span>
              <a href="#" className="underline">Voir les nouveautés</a>
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              Organise et Collabore
            </h1>
            <p className="mt-2 text-5xl font-bold tracking-tight">
              sur tes <span className="underline decoration-4 decoration-green-500">Todo&nbsp;Lists</span>
            </p>

            <p className="mt-6 text-gray-700 text-lg max-w-2xl mx-auto">
              Gère tes tâches, invite ton équipe, travaille en temps réel.
              Intégration Google sécurisée. UI Tailwind.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
             
              <a
                href="#features"
                className="h-12 px-5 rounded-xl border text-base items-center flex bg-orange-600 text-white backdrop-blur transition"
              > Découvrir les fonctionnalités
                
              </a>
            </div>

            <div id="features" className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
             {/* carte One-Click */}
<div className="rounded-2xl border bg-white/70 backdrop-blur p-4 text-left">
  <div className="flex items-center gap-2 font-semibold">
    <OneClickIcon className="w-5 h-5" />
    <span>One-Click</span>
  </div>
  <div className="text-sm text-gray-600">Créer et partager des listes</div>
</div>


              <div className="rounded-2xl border bg-white/70  backdrop-blur p-4 text-left">
                <div className=" flex items-center gap-2 font-semibold">
                <TwoClickIcon className="w-5 h-5" />
                  <span>live</span>
                </div>
                <div className="text-sm text-gray-600">Collaboration en temps réel</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
