"use strict";

// Seleciona elementos do HTML
const fieldNumbers = document.querySelectorAll('.field-numbers');
const inputNumbers = document.getElementById('numbers');
const inputOf = document.getElementById('of');
const inputUntil = document.getElementById('until');

const checkboxRepeat = document.getElementById('repeat');
const sortForm = document.getElementById('sort-form');
const results = document.querySelector('#sort-form .results');
const firstScreen = document.querySelectorAll('.first-view')[0];
const resultScreen = document.querySelectorAll('.result-view')[0];
const sortAgain = document.getElementsByClassName('btn-again')[0];

let randomNumbers = [];
let historyRandomNumbers = [];

// Add evento aos inputs de números para criar mascara que aceita apenas números
for (let fieldNumber of fieldNumbers) {  
  fieldNumber.oninput = () => {
    let value = fieldNumber.value.replace(/\D/g, "")
    fieldNumber.value = value
  }
}

sortForm.onsubmit = (e) => {
  e.preventDefault();
  
  // Verifica se campos estão corretamente preenchidos
  if (inputUntil.value <= inputOf.value) {
    return alert('O campo "DE" deve ser menor do que o campo "ATÉ"');
  }

  // Gerar números sorteados
  sortNumbers();
}

sortAgain.addEventListener('click', () => {  
  sortNumbers();
});

function sortNumbers() { 
  const isNoRepeat = checkboxRepeat.checked;
  const qtd = inputNumbers.value;
  const min = inputOf.value;
  const max = inputUntil.value;  
  const numeros = [];

  while (numeros.length < qtd) {
      const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + 1;
      const isContain = numeros.includes(numeroAleatorio);      
      const isContainInHistory = historyRandomNumbers.flat().includes(numeroAleatorio)
      
      if (isNoRepeat) {
        if (!isContain && !isContainInHistory) {
          numeros.push(numeroAleatorio);
        }
      } else if (!isContain) {
          numeros.push(numeroAleatorio);        
      }
  }  

  // Ordenação dos números
  const ordenNumbers = numeros.sort((a, b) => a - b);

  // Adicionar resultados ao histórico
  historyRandomNumbers = historyRandomNumbers.concat(ordenNumbers);    
  console.log("historyRandomNumbers", historyRandomNumbers)

  // atualizar informações na tela
  renderNumbers(ordenNumbers);
}

function renderNumbers(numbers) {
  firstScreen.style.display = 'none';
  resultScreen.style.display = 'flex';
  results.innerHTML = '';
  sortAgain.classList.remove('active');

  let index = 0;
  const interval = setInterval(() => {
    if (index < numbers.length) {
      const num = numbers[index];
      const elem = document.createElement('div');
      elem.classList.add('result');
      elem.textContent = num;
      results.appendChild(elem);
      index++;
    } else {
      sortAgain.classList.add('active');
      clearInterval(interval); // Para o intervalo quando todos os números forem exibidos
    }
  }, 1100);

  
}


