// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const newLi = document.createElement('li');
    if (fruits[i].color == 'фиолетовый') {
      newLi.className = 'fruit__item fruit_violet';
    } else if (fruits[i].color == 'зеленый') {
      newLi.className = 'fruit__item fruit_green'
    } else if (fruits[i].color == 'розово-красный') {
      newLi.className = 'fruit__item fruit_carmazin'
    } else if (fruits[i].color == 'желтый') {
      newLi.className = 'fruit__item fruit_yellow'
    } else if (fruits[i].color == 'светло-коричневый') {
      newLi.className = 'fruit__item fruit_lightbrown'
    } else {
      newLi.className = 'fruit__item fruit_grey'
    }
    fruitsList.appendChild(newLi);

    const divInfo = document.createElement('div');
    divInfo.className = 'fruit__info';
    newLi.appendChild(divInfo);

    const index = document.createElement('div');
    const kind = document.createElement('div');
    const color = document.createElement('div');
    const weight = document.createElement('div');
    index.innerHTML = `index: ${i}`;
    kind.innerHTML = `kind: ${fruits[i].kind}`;
    color.innerHTML = `color: ${fruits[i].color}`;
    weight.innerHTML = `weight (кг): ${fruits[i].weight}`;
    divInfo.appendChild(index);
    divInfo.appendChild(kind);
    divInfo.appendChild(color);
    divInfo.appendChild(weight);
  }
  console.log(fruits)
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let originalFruits = fruits
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    let randomIndex = getRandomInt (0,fruits.length-1);
    result.push(fruits[randomIndex]);
    fruits.splice(randomIndex, 1);
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  };
  if (result === originalFruits) {
    alert('Перемешайте ещё раз')
  } else {
    fruits = result;
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let fruitsFilter = fruits.filter((item) => {
    // TODO: допишите функцию
    let weight = item.weight;
    let minWeight = document.querySelector('.minweight__input').value;
    let maxWeight = document.querySelector('.maxweight__input').value;
    return weight >= minWeight && weight <= maxWeight;
  });
  fruits = fruitsFilter
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['желтый', 'зеленый', 'фиолетовый', 'светло-коричневый', 'розово-красный'];
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 - priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    for (let i = 0; i < n-1; i++) {
      for (let j = 0; j < n-1-i; j++) {
        if (comparation (arr[j], arr[j+1]) > 0) {
          let temp = arr[j+1];
          arr[j+1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    arr.sort(comparation);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKindLabel.textContent == 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
  sortKind = sortKindLabel.textContent;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  if (kindInput.value == '' || colorInput.value == '' || weightInput.value == '' || parseInt(weightInput.value) < 1 || isNaN(parseInt(weightInput.value))) {
    alert ("Введите корректные значения")
  } else {
    let newFruit = { 
      kind : kindInput.value,
      color : colorInput.value,
      weight : weightInput.value
    };
    fruits.push(newFruit);
    console.log(fruits);
    display();
  }
  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';
});
