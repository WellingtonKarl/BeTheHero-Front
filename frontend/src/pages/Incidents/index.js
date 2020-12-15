import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";

export default function NewIncidents() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [valor, setValor] = useState("");

  const history = useHistory();

  const idOng = localStorage.getItem("ongId");

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      valor,
    };

    try {
      await api.post("incident", data, {
        headers: {
          ongId: idOng,
        },
      });

      console.log(data);
      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar caso, tente novamente");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Valor em Reais"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
