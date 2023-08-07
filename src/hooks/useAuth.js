import { useContext } from "react";
import AuthContext from "../components/auth/AuthProvider";

export default function useAuth() {
    return useContext(AuthContext);
}
