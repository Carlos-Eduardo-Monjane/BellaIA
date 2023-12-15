import React, { useState } from "react";

const tabelas = [
  "venders",
  "users",
  "task_stages",
  "task_comments",
  "settings",
  "revenues",
  "expenses",
  "proposals",
  "proposal_products",
  "projects",
  "projectstages",
  "project_invoices",
  "project_tasks",
  "project_users",
  "product_services",
  "invoices",
  "bills",
  "goals",
  "customers",
  "bank_accounts",
  "bank_transfers",
];

const keywordsArray = [
    "venda", "vendedor", "fornecedor", // Venders
    "usuário", "conta", "perfil", // Users
    "estágio", "andamento", "fase", // Task_stages
    "comentário", "feedback", "observação", // Task_comments
    "configuração", "preferência", "ajuste", // Settings
    "receita", "entrada", "lucro", // Revenues
    "despesa", "custo", "saída", // Expenses
    "proposta", "oferta", "orcamento", // Proposals
    "produto", "item", "serviço", // Proposal_products
    "projeto", "empreendimento", "iniciativa", // Projects
    "fase do projeto", "etapa", "cronograma", // Projectstages
    "fatura do projeto", "cobrança", "recibo", // Project_invoices
    "tarefa do projeto", "atividade", "item de trabalho", // Project_tasks
    "membro do projeto", "equipe", "participante", // Project_users
    "serviço de produto", "combo", "pacote", // Product_services
    "fatura", "conta", "pagamento", // Invoices
    "conta", "documento", "recibo", // Bills
    "meta", "objetivo", "desempenho", // Goals
    "cliente", "comprador", "consumidor", // Customers
    "conta bancária", "saldo", "transação", // Bank_accounts
    "transferência bancária", "movimentação", "envio", // Bank_transfers
  ];

const App = () => {
  const [pergunta, setPergunta] = useState("");
  const [resultado, setResultado] = useState("");

  const handlePerguntaChange = (event) => {
    setPergunta(event.target.value);
  };

  const handleSubmit = () => {
    setResultado(getRelatedTables(pergunta));
  };

  return (
    <div>
      <h1>Busca de tabelas</h1>
      <input
        type="text"
        placeholder="Digite sua pergunta"
        value={pergunta}
        onChange={handlePerguntaChange}
      />
      <button onClick={handleSubmit}>Buscar</button>
      <p>{resultado}</p>
    </div>
  );
};

const getRelatedTables = (pergunta) => {
    const keywords = pergunta.toLowerCase().split(/\s+/).concat(keywordsArray);
  let relatedTables = [];

  for (const keyword of keywords) {
    for (const tabela of tabelas) {
      // Verifica se a palavra-chave está presente no nome da tabela ou em seus campos conhecidos
      if (tabela.includes(keyword) || // Nome da tabela
          (tabela.startsWith('task_') && keyword === 'tarefa') || // Caso especial para tasks
          (tabela.startsWith('project_') && keyword === 'projeto') || // Caso especial para projects
          (tabela.endsWith('_comments') && keyword === 'comentário')) {
        relatedTables.push(tabela);
        break; // Evita duplicados
      }
    }
  }

  if (!relatedTables.length) {
    return `Nenhuma tabela encontrada relacionada à pergunta "${pergunta}".`;
  }

  return `tabelas: ${relatedTables.join(', ')}`;
};

export default App;
