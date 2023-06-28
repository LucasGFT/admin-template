import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// useAuth é um hook que criei para retorna o valor do contexto
const useAuth = () => useContext(AuthContext)

export default useAuth;