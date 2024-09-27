
document.addEventListener('DOMContentLoaded', function () {

    const botaoNotas = document.querySelectorAll('.button1')[0]; 
    const botaoFaltas = document.querySelectorAll('.button1')[1]; 

    const historicoNotas = document.querySelector('.secaohistoricos');
    const historicoFaltas = document.querySelector('.secaohistoricos-faltas');

    function carregarHistorico() {
        const historicoSalvoNotas = localStorage.getItem('historicoNotas');
        const historicoSalvoFaltas = localStorage.getItem('historicoFaltas');
        if (historicoSalvoNotas) {
            historicoNotas.innerHTML = historicoSalvoNotas;
        }
        if (historicoSalvoFaltas) {
            historicoFaltas.innerHTML = historicoSalvoFaltas;
        }
        adicionarFuncionalidadeExcluir(); 
    }

    function salvarHistorico() {
        localStorage.setItem('historicoNotas', historicoNotas.innerHTML);
        localStorage.setItem('historicoFaltas', historicoFaltas.innerHTML);
    }

    function adicionarFuncionalidadeExcluir() {
        const botoesExcluir = document.querySelectorAll('.btn-excluir');
        botoesExcluir.forEach((botao) => {
            botao.addEventListener('click', function () {
                this.parentElement.remove(); 
                salvarHistorico(); 
            });
        });
    }


    function criarItemHistorico(texto) {
        const historicoItem = document.createElement('p');
        historicoItem.innerHTML = `${texto} <button class="btn-excluir">Excluir</button>`;
        return historicoItem;
    }

    botaoNotas.addEventListener('click', function () {
        const nomeMateria = document.querySelector('input[name="nomeMateriaNotas"]').value;
        const numeroProva = document.querySelector('input[name="nProva"]').value;
        const notaProva = document.querySelector('input[name="notaProva"]').value;

        if (nomeMateria && numeroProva && notaProva) {
            const historicoItem = criarItemHistorico(`Matéria: ${nomeMateria}, Prova: ${numeroProva}, Nota: ${notaProva}`);
            historicoNotas.appendChild(historicoItem);

            document.querySelector('input[name="nomeMateriaNotas"]').value = '';
            document.querySelector('input[name="nProva"]').value = '';
            document.querySelector('input[name="notaProva"]').value = '';

            adicionarFuncionalidadeExcluir();

         
            salvarHistorico();
        } else {
            alert('Por favor, preencha todos os campos de Notas.');
        }
    });

 
    botaoFaltas.addEventListener('click', function () {
        const nomeMateriaFaltas = document.querySelector('input[name="nomeMateriaFaltas"]').value;
        const quantidadeFaltas = document.querySelector('input[name="qtdeFaltas"]').value;

        if (nomeMateriaFaltas && quantidadeFaltas) {
            const historicoItem = criarItemHistorico(`Matéria: ${nomeMateriaFaltas}, Faltas: ${quantidadeFaltas}`);
            historicoFaltas.appendChild(historicoItem);

       
            document.querySelector('input[name="nomeMateriaFaltas"]').value = '';
            document.querySelector('input[name="qtdeFaltas"]').value = '';

          
            adicionarFuncionalidadeExcluir();

      
            salvarHistorico();
        } else {
            alert('Por favor, preencha todos os campos de Faltas.');
        }
    });


    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-excluir')) {
            event.target.parentElement.remove();
            salvarHistorico(); 
        }
    });

 
    carregarHistorico();
});
