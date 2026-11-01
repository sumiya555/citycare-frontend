import {createContext,useContext,useEffect,useState} from "react";
import {api} from "../services/api";
const AuthContext=createContext(null);
export function AuthProvider({children}){
 const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem("citycare_user")||"null"));
 const [loading,setLoading]=useState(false);
 async function login(email,password){setLoading(true);try{const data=await api.login({email,password});localStorage.setItem("citycare_token",data.access_token);localStorage.setItem("citycare_user",JSON.stringify(data.user));setUser(data.user);return data.user}finally{setLoading(false)}}
 async function signup(body){return api.signup(body)}
 function logout(){localStorage.removeItem("citycare_token");localStorage.removeItem("citycare_user");setUser(null)}
 useEffect(()=>{},[]);
 return <AuthContext.Provider value={{user,loading,login,signup,logout}}>{children}</AuthContext.Provider>
}
export function useAuth(){return useContext(AuthContext)}
