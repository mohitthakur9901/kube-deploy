
import Cookies from 'js-cookie';
import { useNavigate  , Outlet} from 'react-router-dom';

const PrivateRoute = () => {
    const access_token = Cookies.get('access_token');
    const navigate = useNavigate();

    if (!access_token) {
        navigate('/');
    }
    return <Outlet/>
}

export default PrivateRoute