import { httpAxios } from "@/helper/httpHelper";

export async function signUp(user){
    const result= await httpAxios.post("/api/users",user).then((response)=>response.data);
    return result;
}

export async function login(loginData){
    const result=httpAxios.post("/api/login",loginData).then(response=>response.data)
    return result;
}
export async function currentUser(){
    const result=httpAxios.get("/api/current").then(response=>response.data)
    return result;
}
export async function logout(){
    const result=httpAxios.post("/api/logout").then(response=>response.data)
    return result;
}

