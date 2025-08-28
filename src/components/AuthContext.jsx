import { useContext } from "react";
import { Ctx } from "./AuthProvider.jsx";

export const useAuth = () => useContext(Ctx);