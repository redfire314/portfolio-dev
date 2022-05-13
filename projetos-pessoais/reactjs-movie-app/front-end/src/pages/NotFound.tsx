import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';

function NotFound() {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/');
    }, 3000);

    return <Title title='Página não encontrada :(' />;
}

export default NotFound;
