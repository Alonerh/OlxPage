import { useRoutes, Navigate} from 'react-router-dom';
import  Page  from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { About } from '../pages/About';
import  SignIn  from '../pages/SignIn';
import  SignUp  from '../pages/SignUp';
import AdPage from '../pages/AdPage';
import { RequireAuth, isLogged } from '../helpers/AuthHandler';
import AddAd from '../pages/AddAd';

export const MainRoutes = ()=>{

    const logged = isLogged();

    return useRoutes([
        {path:'/', element:<Page/>},
        {path:'/about', element:<About/>},
        {path:'/signin', element:<SignIn/>},
        {path:'/signup', element:<SignUp/>},
        {path:'/ad/:id', element:<AdPage/>},
        {path: "/post-an-ad", element:
            <RequireAuth>
                {logged ? <AddAd/> : <Navigate to={'/signin'}/>}
            </RequireAuth>
        },
        {path:'*', element:<NotFound/>},
    ])
}