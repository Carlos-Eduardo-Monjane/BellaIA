import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');

  const enviarPergunta = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            {
              role: 'system',
              content: 'Você é um assistente virtual.'
            },
            {
              role: 'user',
              content: pergunta
            }
          ],
          model: 'gpt-4-1106-preview',
          temperature: 0.7,
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        }
      );

      // Extrair e definir a resposta no estado
      console.log("Resposta:");
      console.log(response.data.choices[0]?.message.content);
      setResposta(response.data.choices[0]?.message.content.trim() || 'Resposta indisponível');
    } catch (error) {
      console.error('Erro ao enviar pergunta:', error);
    }
  };

  return (
    <div className="App">
      {/* Seu código JSX existente aqui */}

      {/* Adicione um campo de entrada para a pergunta e um botão para enviar */}
      <div>
      <br></br>
      <br></br>
      <br></br>
        <input
          type="text"
          placeholder="Faça uma pergunta..."
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
        />
        <button onClick={enviarPergunta}>Enviar Pergunta</button>
      </div>

      {/* Exibir a resposta */}
      <p>{resposta}</p>
    </div>
  );
}

export default App;
