// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection, addDoc, query, where, onSnapshot,
  updateDoc, doc, deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../components/AuthContext.jsx";
import AppShell from "../components/AppShell.jsx";
import { motion, AnimatePresence } from "framer-motion";

/* icônes petites */
const TrashIcon = (p) => (
  <svg viewBox="0 0 24 24" className={p.className||"w-4 h-4"} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M9 6V4h6v2" strokeLinecap="round"/>
  </svg>
);
const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" className={p.className||"w-4 h-4"} fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* effets discrets */
function AccentFX() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -top-10 right-6 w-28 h-28 rounded-full bg-blue-500/15 blur-2xl"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute -top-2 right-24 w-8 h-8 text-blue-600 opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.path
          d="M5 13l4 4L19 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.4 }}
        />
      </motion.svg>
    </>
  );
}

export default function Home() {
  const { user } = useAuth() || {};
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // édition
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("sharedWith", "array-contains", user.uid));
    const un = onSnapshot(q, (snap) =>
      setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return un;
  }, [user]);

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  const done = useMemo(() => tasks.filter(t => t.status === "done").length, [tasks]);
  const pct  = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  const handleAddTask = async (e) => {
    e?.preventDefault();
    if (!newTask.trim()) return;
    await addDoc(collection(db, "tasks"), {
      text: newTask.trim(),
      owner: user.uid,
      sharedWith: [user.uid],
      status: "todo",
      createdAt: Date.now(),
    });
    setNewTask("");
  };

  const handleDeleteTask = async (id) => deleteDoc(doc(db, "tasks", id));
  const handleToggleStatus = async (t) =>
    updateDoc(doc(db, "tasks", t.id), { status: t.status === "todo" ? "done" : "todo" });

  const startEdit = (t) => { setEditingId(t.id); setEditingText(t.text); };
  const cancelEdit = () => { setEditingId(null); setEditingText(""); };
  const saveEdit = async () => {
    const txt = editingText.trim();
    if (!txt) return;
    await updateDoc(doc(db, "tasks", editingId), { text: txt });
    cancelEdit();
  };

  return (
    <AppShell>
      <section className="max-w-5xl mx-auto pt-24 pb-24 px-4">
        {/* entête compacte avec effets */}
        <div className="relative mb-8">
          <AccentFX />
          <h1 className="text-2xl font-bold">Bienvenue {user.displayName || user.email}</h1>
          <div className="mt-3">
            <div className="h-2 rounded-full bg-black/10 overflow-hidden">
              <motion.div
                className="h-full bg-blue-700"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
            <div className="text-sm text-gray-600 mt-1">{pct}% terminé</div>
          </div>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleAddTask}
          className="rounded-2xl border bg-white/80 backdrop-blur p-5 mb-6 shadow-sm"
        >
          <label className="block text-sm font-medium mb-2">Nouvelle tâche</label>
          <div className="flex gap-2">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Ex: Préparer la démo"
              className="flex-1 h-12 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-blue-600 bg-white/70"
            />
            <motion.button
              type="submit"
              className="h-12 px-5 rounded-xl bg-blue-700 text-white"
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -1 }}
            >
              Ajouter
            </motion.button>
          </div>
        </form>

        {/* Liste */}
        <div className="rounded-2xl border bg-white/80 backdrop-blur overflow-hidden">
          {tasks.length === 0 ? (
            <div className="p-10 text-center text-gray-600">Aucune tâche pour l’instant.</div>
          ) : (
            <ul>
              <AnimatePresence initial={false}>
                {tasks.map((t) => (
                  <motion.li
                    key={t.id}
                    className="p-4 flex items-start gap-3 border-b last:border-b-0"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  >
                    {/* toggle */}
                    <motion.button
                      onClick={() => handleToggleStatus(t)}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      className={`mt-1 w-6 h-6 rounded-full border flex items-center justify-center
                        ${t.status === "done" ? "bg-blue-700 text-white border-blue-700" : "bg-white"}`}
                      aria-label={t.status === "done" ? "Marquer à faire" : "Marquer terminé"}
                    >
                      {t.status === "done" && <CheckIcon />}
                    </motion.button>

                    {/* contenu + édition */}
                    <div className="flex-1">
                      {editingId === t.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="flex-1 h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                          />
                          <button
                            onClick={saveEdit}
                            className="h-10 px-3 rounded-lg bg-blue-700 text-white text-sm"
                            type="button"
                          >
                            Enregistrer
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="h-10 px-3 rounded-lg border text-sm"
                            type="button"
                          >
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className={`font-medium ${t.status === "done" ? "line-through text-gray-500" : ""}`}>
                            {t.text}
                          </div>
                          <div className="mt-2 flex items-center gap-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full border
                              ${t.status === "done"
                                ? "bg-green-50 border-green-200 text-green-700"
                                : "bg-amber-50 border-amber-200 text-amber-700"}`}>
                              {t.status === "done" ? "Terminé" : "À faire"}
                            </span>
                            <button onClick={() => { setEditingId(t.id); setEditingText(t.text); }} className="text-sm underline" type="button">
                              Modifier
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* supprimer */}
                    <motion.button
                      onClick={() => handleDeleteTask(t.id)}
                      whileTap={{ scale: 0.96 }}
                      className="text-red-600 hover:underline flex items-center gap-1"
                      aria-label="Supprimer"
                    >
                      <TrashIcon />
                      <span className="text-sm">Supprimer</span>
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </section>
    </AppShell>
  );
}
