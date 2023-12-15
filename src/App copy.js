// src/App.js
import React, { useState } from 'react';
import logo from './img/betha.gif';
import './App.css';
import axios from 'axios';

const comandos = [
  {
    entrada: 'acessar memórias',
    retorno_escrito: 'Sim, senhor!',
    retorno_falado: 'Sim, senhor!',
    rota: '/memorias/',
    especial: false,
  },
  {
    entrada: 'Qual é o seu nome',
    retorno_escrito: 'Meu nome é Bella!',
    retorno_falado: 'Meu nome é Bella.',
    rota: false,
    especial: false,
  },
    {
    entrada: 'Como você se chama',
    retorno_escrito: 'Meu nome é Bella!',
    retorno_falado: 'Meu nome é Bella.',
    rota: false,
    especial: false,
  },
  {
    entrada: 'Qual é o teu nome',
    retorno_escrito: 'Meu nome é Bella!',
    retorno_falado: 'Meu nome é Bella.',
    rota: false,
    especial: false,
  },
  {
    entrada: 'Diga-me seu nome',
    retorno_escrito: 'Meu nome é Bella!',
    retorno_falado: 'Meu nome é Bella.',
    rota: false,
    especial: false,
  },
    {
    entrada: 'Qual o teu nome',
    retorno_escrito: 'Meu nome é Bella!',
    retorno_falado: 'Meu nome é Bella.',
    rota: false,
    especial: false,
  },
  {
    entrada: 'Pode me dizer seu nome',
    retorno_escrito: 'Me chamo Bella!',
    retorno_falado: 'Me chamo Bella.',
    rota: false,
    especial: false,
  },
  {
    entrada: 'Como devo te chamar',
    retorno_escrito: 'Pode me chamar de Bella!',
    retorno_falado: 'Pode me chamar de Bella.',
    rota: false,
    especial: false,
  },
  {
    entrada: 'Diga-me quem és',
    retorno_escrito: 'Sou a assistente virtual Bella!',
    retorno_falado: 'Sou a assistente virtual Bella.',
    rota: false,
    especial: false,
  },
  {
    entrada: 'Acenda a luz',
    retorno_escrito: 'Não estou conectado!',
    retorno_falado: 'Não estou conectado!',
    rota: false,
    especial: false,
  },
  {
    entrada: 'Acende a luz',
    retorno_escrito: 'Não estou conectado!',
    retorno_falado: 'Não estou conectado!',
    rota: false,
    especial: false,
  },
  {
    entrada: 'enviar e-mail',
    retorno_escrito: 'Para quem gostaria de enviar?',
    retorno_falado: 'Para quem gostaria de enviar?',
    rota: false,
    especial: function () {
      alert('Para quem gostaria de enviar?', 'Para quem gostaria de enviar?', false);
      alert('Disparou o evento!');
    },
  },
];

function App() {
  const [resposta, setResposta] = useState('');
  const [estaFalando, setEstaFalando] = useState(false);
  const [textoReconhecido, setTextoReconhecido] = useState('');
  const recognition = new window.webkitSpeechRecognition();

  // Configurar o idioma para português do Brasil
  recognition.lang = 'pt-BR';

  recognition.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    setTextoReconhecido(texto);
    setEstaFalando(false);

    // Verificar se a entrada do usuário corresponde a algum comando pré-registrado
    processarComando(texto);
  };

  // Função para remover acentos de uma string
  const removerAcentos = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const falarTexto = (texto) => {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.75;
    utterance.pitch = 1;
    // message.voiceURI = 'native';
    // message.volume = 1; // 0 to 1
    // message.rate = 0.8; // 0.1 to 10
    // message.pitch = 1; //0 to 2
    window.speechSynthesis.speak(utterance);
  };

  const handleClick = () => {
    if (!estaFalando) {
      recognition.start();
      setEstaFalando(true);
    } else {
      recognition.stop();
      setEstaFalando(false);
    }
  };

  const processarComando = (entradaUsuario) => {
    // const comandoEncontrado = comandos.find((comando) => comando.entrada.toLowerCase() === entradaUsuario.toLowerCase());

    const entradaUsuarioSemAcentos = removerAcentos(entradaUsuario.toLowerCase());

    const comandoEncontrado = comandos.find(
      (comando) => removerAcentos(comando.entrada.toLowerCase()) === entradaUsuarioSemAcentos
    );

    if (comandoEncontrado) {
      if (comandoEncontrado.especial) {
        comandoEncontrado.especial();
      } else {
        console.log("Localmente");
        setResposta(comandoEncontrado.retorno_escrito);
        falarTexto(comandoEncontrado.retorno_falado);
      }
    } else {
      console.log("OpenAI");
      // Se o comando não foi encontrado, consultar a OpenAI
      enviarPergunta(entradaUsuario);
    }
  };

  const enviarPergunta = async (texto) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            {
              role: 'system',
              content: 'Você é um assistente virtual.',
            },
            {
              role: 'user',
              content: texto,
            },
          ],
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          // max_tokens: 180,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        }
      );

      // Extrair e definir a resposta no estado
      const respostaOpenAI = response.data.choices[0]?.message.content.trim() || 'Resposta indisponível';
      setResposta(respostaOpenAI);
      falarTexto(respostaOpenAI);
    } catch (error) {
      console.error('Erro ao enviar pergunta:', error);
    }
  };

  return (
    <div className="App">
      {/* Estilo para cobrir toda a tela de preto */}
      <div className="telaPreta">
        <header className="App-header">
          {/* Imagem animada do logo */}
          <img src={logo} className="App-logo" alt="logo" />

          {/* Espaço do texto de resposta */}
          <div className='Informe'>
            <p className="TextoResposta">
              {/* Seu texto de resposta vai aqui */}
              <div className="block">
                <p id="pergunta">
                  {textoReconhecido}
                </p>
              </div>
              <div className="block">
                <p id="resposta">
                  {resposta}
                </p>
              </div>
            </p>
          </div>

          {/* Botão de Falar */}
          <button className="BotaoFalar" onClick={handleClick}>
            {estaFalando ? 'Ouvindo...' : <i className="mdi mdi-microphone"></i>}
          </button>
        </header>
      </div>
    </div>
  );
}

export default App;
