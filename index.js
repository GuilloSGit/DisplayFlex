const container = document.querySelector('.container');
const flexDirectionInputs = document.querySelectorAll('input[name="flex-direction"]');
const justifyContentInputs = document.querySelectorAll('input[name="justify-content"]');
const alignContentInputs = document.querySelectorAll('input[name="align-content"]');
const flexWrapInputs = document.querySelectorAll('input[name="flex-wrap"]');
const slider = document.getElementById('slider');
const increaseGapBtn = document.getElementById('increase-gap');
const decreaseGapBtn = document.getElementById('decrease-gap');
const sliderValue = document.getElementById('slider-value');
const gapValue = document.getElementById('gap-value');
let gap = 3; // Valor inicial del gap entre los cuadros
const createBoxesBtn = document.getElementById('create-boxes');
const boxCountSelect = document.getElementById('box-count');

const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;
const containerWidthSpan = document.getElementById('container-width');
const containerHeightSpan = document.getElementById('container-height');

let resizeObserver = null; // Variable para almacenar la instancia de ResizeObserver

// Función que se ejecuta cuando cambia el offsetWidth del elemento
const handleContainerResize = (entries) => {
  for (let entry of entries) {
    const newWidth = Math.floor(entry.contentRect.width);
    const newHeight = Math.floor(entry.contentRect.height);
    containerWidthSpan.textContent = `Ancho: ${newWidth}px`;
    containerHeightSpan.textContent = `Ancho: ${newHeight}px`;
  }
};

// Función para iniciar la observación del elemento .container
const startObservingContainer = () => {
  if (resizeObserver) {
    resizeObserver.disconnect(); // Detener la observación anterior si existe
  }
  
  resizeObserver = new ResizeObserver(handleContainerResize);
  resizeObserver.observe(container);
};

// Iniciar la observación del elemento .container
startObservingContainer();

const form = document.querySelector('form');
createBoxesBtn.disabled = true;


form.addEventListener('submit', function(event) {
  event.preventDefault();
});

slider.addEventListener('input', function() {
  const boxSize = parseInt(this.value);
  const boxes = document.querySelectorAll('.box');
  const adjustment = 2 * (boxSize - Math.floor(boxSize / 10) * 10);
  boxes.forEach(box => {
    box.style.width = boxSize - adjustment + 'px';
    box.style.height = boxSize - adjustment + 'px';
  });
  sliderValue.textContent = boxSize + 'px';
});

increaseGapBtn.addEventListener('click', function() {
  gap += 5; // Incrementa el valor del gap en 5
  container.style.gap = gap + 'px';
  gapValue.textContent = gap + 'px';
});

decreaseGapBtn.addEventListener('click', function() {
  if (gap > 5) { // Verifica que el gap no sea menor a 5
    gap -= 5; // Decrementa el valor del gap en 5
    container.style.gap = gap + 'px';
    gapValue.textContent = gap + 'px';
  }
});

flexDirectionInputs.forEach(input => {
  input.addEventListener('change', function() {
    container.style.flexDirection = this.value;
  });
});

justifyContentInputs.forEach(input => {
  input.addEventListener('change', function() {
    container.style.justifyContent = this.value;
  });
});

alignContentInputs.forEach(input => {
  input.addEventListener('change', function() {
    container.style.alignContent = this.value;
  });
});

flexWrapInputs.forEach(input => {
  input.addEventListener('change', function() {
    container.style.flexWrap = this.value;
  });
});

boxCountSelect.addEventListener('input', function() {
  const boxCount = parseInt(this.value);
  if (isNaN(boxCount) || boxCount < 1 || boxCount > 500) {
    createBoxesBtn.disabled = true;
  } else {
    createBoxesBtn.disabled = false;
  }
});

createBoxesBtn.addEventListener('click', function(event) {
  event.preventDefault();
  const boxCountSelect = document.getElementById('box-count');
  const boxCount = parseInt(boxCountSelect.value);
  createBoxes(boxCount);
  slider.value = 100;
  sliderValue.textContent = '100px';
  gapValue.textContent = '3px';
  boxCountSelect.value = '';
});

function createBoxes(count) {
  if (!Number.isInteger(count) || count < 1) {
    alert("Oops! That's too few boxes. Please enter a number greater than or equal to 1 and give it another go!");
    return;
  }

  if (count > 500) {
    alert("Oops! That's too many boxes. Please enter a number less than or equal to 500 and give it another go!");
    return;
  }

  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = i;

    // Generar color de fondo aleatorio
    const randomColor = getRandomColor();
    box.style.backgroundColor = randomColor;

    container.appendChild(box);
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Código para crear los cuadros por defecto
let count = 4;
createBoxes(count);
