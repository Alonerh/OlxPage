import { HeaderArea } from './styled';
import { Link } from 'react-router-dom';
import { isLogged, doLogout } from '../../../helpers/AuthHandler';

export const Header = ()=>{

    const logged = isLogged();

    const handleLogout = ()=>{
        doLogout();
        window.location.href = '/';
    }

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to={'/'}>
                        <span className="logo1">O</span>
                        <span className="logo2">L</span>
                        <span className="logo3">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to={'/my-account'}>Minha conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to={'/post-an-ad'} className='button'>Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged &&
                            <>
                                <li>
                                    <Link to={'/signin'}>LogIn</Link>
                                </li>
                                <li>
                                    <Link to={'/signup'}>Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to={'/signin'} className='button'>Poste um anúncio</Link>
                                </li>
                            </>
                        }      
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    )
}