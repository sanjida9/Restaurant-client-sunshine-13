import { createContext } from "react";
import useFirebase from "../hooks/useFirebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const allContext = useFirebase();

  const data = { allContext };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
