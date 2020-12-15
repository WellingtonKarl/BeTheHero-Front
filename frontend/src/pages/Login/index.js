import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import './styles.css';
import heroesImg from  '../../assets/heroes.png';
import loginImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Login({children}){
    const [id, setId] = useState('');
    
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        

        try{
            const response = await api.get(`ong/${id}`);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name );
            history.push('/profile');
        }catch(err){
            alert('Falha no login, tente novamente.')
        }
        
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={loginImg} alt="Be The Hero"></img>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input placeholder="Sua ID"
                    onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size = {16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}