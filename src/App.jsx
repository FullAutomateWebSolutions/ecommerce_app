import { useState } from 'react';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('#3498db');

  const mudarCor = () => {
    const cores = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f'];
    const novaCor = cores[Math.floor(Math.random() * cores.length)];
    setCor(novaCor);
  };

  return (
    <div className="app">
      <h1>Olá {nome || 'visitante'} 👋</h1>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button style={{ backgroundColor: cor }} onClick={mudarCor}>
        Mudar cor
      </button>
    </div>
  );
}

export default App;
