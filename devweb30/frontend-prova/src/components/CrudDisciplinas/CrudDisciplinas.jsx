import { useEffect, useState } from "react";
import "./CrudDisciplinas.css";

const API = "http://localhost:4000/api/disciplinas";

export default function CrudDisciplinas() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
  });

  const emEdicao = form.id !== null;

  // Carregar lista inicial da API
  useEffect(() => {
    async function carregarDisciplinas() {
      const res = await fetch(API);
      const dados = await res.json();
      setLista(dados || []);
    }
    carregarDisciplinas();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function limparForm() {
    setForm({ id: null, nome: ""});
  }

  async function criarDisciplina() {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
      }),
    });
    const novo = await res.json();
    setLista((antiga) => [novo, ...antiga]);
    limparForm();
  }

  async function atualizarDisciplina() {
    const res = await fetch(`${API}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
      }),
    });
    const atualizado = await res.json();

    setLista((itens) =>
      itens.map((a) => (a.id === atualizado.id ? atualizado : a))
    );
    limparForm();
  }

  async function removerDisciplina(id) {
    const confirmar = window.confirm("Tem certeza que deseja remover esta disciplina?");
    if (!confirmar) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    setLista((itens) => itens.filter((a) => a.id !== id));
  }

  function iniciarEdicao(disciplina) {
    setForm(disciplina);
  }
  
  function onSubmit(e) {
    e.preventDefault();
    if (emEdicao) atualizarDisciplina();
    else criarDisciplina();
  }

  return (
    <div className="card crud">
      <h2 className="crud__title">Gestão de Disciplinas</h2>
      <p className="crud__subtitle">CRUD simples de Disciplinas consumindo API.</p>

      {/* FORMULÁRIO */}
      <form onSubmit={onSubmit} className="crud__form">
        <div className="form-row">
          <div className="form-field">
            <label className="label">Nome</label>
            <input
              className="input"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex.: Matemática"
            />
          </div>
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary">
            {emEdicao ? "Atualizar" : "Adicionar"}
          </button>
          <button type="button" onClick={limparForm} className="btn btn-ghost">
            Limpar
          </button>
        </div>
      </form>

      {/* LISTA */}
      <table className="table">
        <thead>
          <tr>
            <th className="th">Nome</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td className="td" colSpan={3}>— Nenhuma disciplina cadastrada —</td>
            </tr>
          ) : (
            lista.map((a) => (
              <tr key={a.id}>
                <td className="td">{a.nome}</td>
                <td className="td">
                  <div className="row-actions">
                    <button className="btn btn-small" onClick={() => iniciarEdicao(a)}>Editar</button>
                    <button className="btn btn-small" onClick={() => removerDisciplina(a.id)}>Remover</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
