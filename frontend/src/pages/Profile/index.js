import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profiles(){
    const history = useHistory();
    const idOng = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('incident/', {
        headers:{
            ongId: idOng,
        }
    }).then(response => {
        setIncidents(response.data);
    })
    }, [idOng]);

    async function hendleDeleteIncident(id){
        try{
            await api.delete(`incident/${id}`, {
                headers: {
                    ongId:idOng,
                }
            });
            alert(`Deletato com sucesso` );
            setIncidents(incidents.filter(incident => incident.idIncident !== id));

        }catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents">Cadastrar novo caso</Link>
                <button>
                    <FiPower onClick={handleLogout} size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.idIncident}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('Pt-Br',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => hendleDeleteIncident(incident.idIncident)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))} 
            </ul>

        </div>
    )
}

 