const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request(path, options={}){
  const token=localStorage.getItem("citycare_token");
  const headers={"Content-Type":"application/json",...(options.headers||{})};
  if(token) headers.Authorization=`Bearer ${token}`;
  const res=await fetch(`${BASE_URL}${path}`,{...options,headers});
  const data=await res.json().catch(()=>({detail:"Server error"}));
  if(!res.ok) throw new Error(data.detail||"Request failed");
  return data;
}
export const api={
 signup:(body)=>request("/auth/signup",{method:"POST",body:JSON.stringify(body)}),
 login:(body)=>request("/auth/login",{method:"POST",body:JSON.stringify(body)}),
 forgot:(body)=>request("/auth/forgot-password",{method:"POST",body:JSON.stringify(body)}),
 reset:(body)=>request("/auth/reset-password",{method:"POST",body:JSON.stringify(body)}),
 myComplaints:(params="")=>request(`/complaints/${params}`),
 createComplaint:(body)=>request("/complaints/",{method:"POST",body:JSON.stringify(body)}),
 updateComplaint:(id,body)=>request(`/complaints/${id}`,{method:"PUT",body:JSON.stringify(body)}),
 deleteComplaint:(id)=>request(`/complaints/${id}`,{method:"DELETE"}),
 adminComplaints:(params="")=>request(`/admin/complaints${params}`),
 stats:()=>request("/admin/stats"),
 status:(id,status)=>request(`/admin/complaints/${id}/status`,{method:"PUT",body:JSON.stringify({status})}),
 adminDelete:(id)=>request(`/admin/complaints/${id}`,{method:"DELETE"})
};
