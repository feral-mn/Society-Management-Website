import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); // user or admin data
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null); // "user" | "admin"
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchProfile = async () => {
            if(!token || !role){
                setLoading(false);
                return;
            }
            try{

                const endpoint = role === "admin" ? "/api/v1/admin/profile" : "/api/v1/user/profile"
                console.log(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`)
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`,{
                    headers: {Authorization: `Bearer ${token}`}
                })
                
                setUser(res.data.user)
            }catch(err){
                console.error("Profile fetch error", err)
                logout()
            }finally{
                setLoading(false)
            }
        }
        fetchProfile()
    },[token, role])

  const login = (token, role, userData = null) => {
    console.log("Ran login context")
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setRole(role);
    if (userData) setUser(userData);
    console.log("Data coming from backend", userData)
    };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    setUser(null);
  };


    return(
        <AuthContext.Provider value={{ user, token, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);
