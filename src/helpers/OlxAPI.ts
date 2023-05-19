import Cookies from "cookies-ts";
import qs from 'qs';

const cookies = new Cookies(); 

const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchPost = async (endpoint:string, body:any)=>{
    if(!body.token) {
        const token = cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const apiFetchGet = async (endpoint:string, body:any = [])=>{//Antes body era Any
    if(!body.token) {
        const token = cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const apiFetchFile = async (endpoint:string, body:any = {})=>{//Antes body era Any

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
} 

const OlxAPI = {
    login:async(email:string, password:string)=>{
        // fazer consulta ao web service
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );
        return json;
    },
    register: async(name:string, email:string, password:string, stateLoc:string)=>{
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },
    getStates: async()=>{
        const json = await apiFetchGet('/states');
        console.log(json)
        return json.states;
    },
    getCategories: async()=>{
        const json = await apiFetchGet('/categories');
        return json.categories;
    },
    getAds: async(options:any)=>{
        const json = await apiFetchGet('/ad/list', options);
        return json;
    },
    getAd: async(id:string | undefined, other = false)=>{ //Por padrão, recebe falso
        const json = await apiFetchGet('/ad/item', {id, other});
        console.log(json)
        return json;
    },
    addAd: async(fData:any)=>{ //Por padrão, recebe falso
        const json = await apiFetchFile('/ad/add', fData);
        return json;
    }
};

export default ()=>OlxAPI;