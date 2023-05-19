import Cookies from 'cookies-ts';

const cookies = new Cookies(); 

export const isLogged = () =>{
    const token = cookies.get('token');
    return (token) ? true : false;
}

 type RequireProps = {
    children: JSX.Element
} 
//RequireAuth
export const RequireAuth = ({ children }:RequireProps)=>{
    return children;
}

export const doLogin = (token:string, rememberPassword = false)=>{
    if (rememberPassword) {
        cookies.set('token', token, { expires: 999})
    } else {
        cookies.set('token', token)
    }
}

export const doLogout = ()=>{
    cookies.remove('token');
}
