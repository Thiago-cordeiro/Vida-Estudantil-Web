function getLocalStorageData(key) {
  try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
  } catch (e) {
      console.error(`Erro ao analisar dados de ${key}:`, e);
      return [];
  }
}

function setLocalStorageData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


document.addEventListener('DOMContentLoaded', function () {
  atualizarHistorico();
  atualizarSaldo();
});

function atualizarHistorico() {
  const historico = getLocalStorageData('historico');
  const secoesHistorico = document.querySelector('.secaohistoricos');
  secoesHistorico.innerHTML = ''; 

  historico.forEach((item, index) => {
      const div = document.createElement('div');
      div.textContent = `${item.tipo}: R$ ${item.valor.toFixed(2)}`;
      
 
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.addEventListener('click', () => {
          excluirRegistro(index); 
      });

      div.appendChild(deleteButton); 
      secoesHistorico.appendChild(div);
  });
}

function atualizarSaldo() {
  const saldoAtual = getLocalStorageData('saldo');
  const saldoSaida = document.querySelector('.div h3');
  saldoSaida.textContent = `Saldo Atual: R$ ${saldoAtual.toFixed(2)}`;
}


function adicionarRegistro(tipo, valor) {
  const historico = getLocalStorageData('historico');
  const saldo = getLocalStorageData('saldo') || 0;


  historico.push({ tipo, valor });
  setLocalStorageData('historico', historico);


  const novoSaldo = tipo === 'Entrada' ? saldo + valor : saldo - valor;
  setLocalStorageData('saldo', novoSaldo);

  
  atualizarHistorico();
  atualizarSaldo();
}


function excluirRegistro(index) {
  const historico = getLocalStorageData('historico');
  const saldo = getLocalStorageData('saldo') || 0;

 
  const itemRemovido = historico[index]; 
  historico.splice(index, 1); 
  setLocalStorageData('historico', historico); 

  // Atualiza o saldo
  const novoSaldo = itemRemovido.tipo === 'Entrada' 
      ? saldo - itemRemovido.valor 
      : saldo + itemRemovido.valor; 
  setLocalStorageData('saldo', novoSaldo);


  atualizarHistorico();
  atualizarSaldo();
}


function excluirTudo() {
  setLocalStorageData('historico', []); 
  setLocalStorageData('saldo', 0); 
  atualizarHistorico(); 
  atualizarSaldo(); 
}


document.querySelectorAll('.button1').forEach((button, index) => {
  button.addEventListener('click', function () {
      const input = button.previousElementSibling;
      const valor = parseFloat(input.value);
      if (isNaN(valor) || valor <= 0) {
          alert('Por favor, insira um valor válido.');
          return;
      }

      if (index === 0) { 
          adicionarRegistro('Entrada', valor);
      } else if (index === 1) { 
          adicionarRegistro('Saída', valor);
      }

      input.value = '';
  });
});


const excluirTudoButton = document.querySelector('.button-excluir-tudo');
excluirTudoButton.addEventListener('click', excluirTudo);
