const buttons = document.querySelectorAll("#calculadora-form button");
let currentValue = "";
let valores = [];
let operation = "";
let resultado = 0;
let resultadoAnterior = 0

buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const value = button.getAttribute('data-value');
    const op = button.getAttribute('data-op');

    if (value) {
      currentValue += value;
      document.getElementById('display').value = currentValue;
    } else if (op === "=") {
      valores.push(parseFloat(currentValue));
      calcular();
    } else if (op === "C") {
      limpar();
    } else {
      valores.push(parseFloat(currentValue || resultadoAnterior));
      operation = op;
      currentValue = '';
    }
  });
});

function calcular() {
  if (valores.length < 2 || !operation) return;

  const operacoes = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
  };


  try {
    let resultado;
    resultado = operacoes[operation](valores[0], valores[1]);
    resultadoAnterior = resultado;
    valores = [];
    currentValue = ''; // Limpa currentValue
    document.getElementById('display').value = resultado;
  } catch (erro) {
    resultadoAnterior = 0; // Reset resultadoAnterior
    document.getElementById('display').value = 'Erro';
  }
}


function limpar() {
  currentValue = '';
  valores = [];
  operation = '';
  resultado = 0;
  document.getElementById('display').value = '';
}
