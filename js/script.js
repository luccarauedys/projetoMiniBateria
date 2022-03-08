/* Pointer Event */

const teclas = document.querySelector('.teclas');

function verificarClique(e) {
  if (e.target.localName === 'button') {
    const idTecla = e.target.id;
    reproduzirSom(idTecla);
  }
}

function reproduzirSom(idTecla) {
  destacarTecla(idTecla);
  const audio = document.getElementById(`som_${idTecla}`);
  audio.currentTime = 0;
  audio.play();
}

function destacarTecla(idTecla) {
  const tecla = document.getElementById(idTecla);
  tecla.classList.add('selecionada');
  setTimeout(() => {
    tecla.classList.remove('selecionada');
  }, 300);
}

teclas.addEventListener('click', verificarClique);

/* Keyboard Event */

const teclasValidas = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

document.addEventListener('keyup', verificarTecla);

function verificarTecla(e) {
  const teclaPressionada = e.key.toUpperCase();

  if (teclasValidas.includes(teclaPressionada)) {
    const idTecla = `tecla${teclaPressionada}`;
    reproduzirSom(idTecla);
  }
}

/* Sequência no Input */

const inputSequencia = document.getElementById('sequencia');
const btnTocar = document.getElementById('btnTocar');

function pegarSequencia() {
  const valorDoInput = inputSequencia.value;

  if (valorDoInput) {
    const sequencia = valorDoInput.split('');
    tocarSequencia(sequencia);
  }
}

function tocarSequencia(sequencia) {
  inputSequencia.value = "";
  let esperar = 0;

  for (let tecla of sequencia) {
    if (teclasValidas.includes(tecla.toUpperCase())) {
      const idTecla = `tecla${tecla.toUpperCase()}`;
      setTimeout(() => {
        reproduzirSom(idTecla);
      }, esperar);

      esperar += 300;
    }
  }
}

inputSequencia.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    pegarSequencia();
  }
});

btnTocar.addEventListener('click', pegarSequencia);
