
import {useRoutes } from 'react-router-dom';
import {Update} from '../pages/update';
import {Teste} from '../pages/Teste';
import {Home} from '../pages/Home';

export const MyRoutes =() =>{
    return useRoutes([
        {path: '/Update/:id/:age/:name', element: <Update />},
        {path: '/Teste', element: <Teste />},
        {path: '/Home', element: <Home />}
    ]);
}