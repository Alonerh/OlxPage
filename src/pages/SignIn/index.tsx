import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { useState } from 'react';
import useAPI from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

const Page = ()=>{
    const api = useAPI();

    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false);
    

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.login(email, password);

        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href = '/';
        }

        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
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
                                onChange={e=>setPassWord(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Lembrar senha</div>
                        <div className="area--input">
                            <input type="checkbox" 
                                name="" 
                                id="checkbox"  
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={()=>setRememberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
    

};

export default Page;