export const generateToken=({email})=>{
    let token =Date.now() + btoa(email) + Date.now();
    return token;
}