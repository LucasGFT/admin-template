import { useContext } from "react";
import AppContext from "../context/AppContext";

// useAppData é um hook que criei para retorna o valor do contexto
const useAppData = () => useContext(AppContext)

export default useAppData;