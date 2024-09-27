const input = document.querySelector('.input-task');
const button = document.querySelector('.button-add-task');
const listTasks = document.querySelector('.list-tasks');

let lista = [];

recarregarTarefas();

function popularArray() {
    const taskValue = input.value.trim();
    if (taskValue === "") {
        window.alert('Erro, digite algo');
    } else {
        lista.push({
            tarefa: taskValue,
            concluida: false,
        });
        input.value = "";
        mostrarLista();
    }
}

function mostrarLista() {
    let novaLi = "";

    lista.forEach((item, posicao) => {
        novaLi += `
        <li class="task ${item.concluida ? "done" : ""}">
            <img src="./img/mark.png" alt="check-na-tarefa" onclick="concluirTask(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/delete.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        `;
    });
    
    listTasks.innerHTML = novaLi;

    
    localStorage.setItem('lista', JSON.stringify(lista));
}

function concluirTask(posicao) {
    lista[posicao].concluida = !lista[posicao].concluida;
    mostrarLista();
}

function deletarItem(posicao) {
    lista.splice(posicao, 1); 
    mostrarLista();
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista');
  
    if (tarefasDoLocalStorage) {
        lista = JSON.parse(tarefasDoLocalStorage);
    }
  
    mostrarLista();
}

button.addEventListener('click', popularArray);
