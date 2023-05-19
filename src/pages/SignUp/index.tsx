import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { useState, useEffect } from 'react';
import useAPI from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

const Page = ()=>{
    const api = useAPI();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    type StateType = {_id: string, name: string};
    const [stateList, setStateList] = useState<StateType[]>([]);

    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        const getStates = async ()=>{
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, [])
    

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword) {
            setError('Senhas diferentes!');
            setDisabled(false);
            return;
        }
        const json = await api.register(name, email, password, stateLoc);

        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token);
            window.location.href = '/';
        } 

        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className="area--title">Nome completo</div>
                        <div className="area--input">
                            <input type="text" 
                                id="name" 
                                disabled={disabled}
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                           <select 
                            name="select" 
                            id="select" 
                            required
                            value={stateLoc}
                            onChange={(e)=>setStateLoc(e.target.value)}
                            >
                                <option value=""></option>
                                {stateList.map((item, index)=>(
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))}

                            </select>
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Email</div>
                        <div className="area--input">
                            <input type="email" 
                                id="email" 
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input type="password" 
                                name="" 
                                id="password"  
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Confirmar senha</div>
                        <div className="area--input">
                            <input type="password" 
                                name="" 
                                id="confirmPassword"  
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e=>setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
    

};

export default Page;