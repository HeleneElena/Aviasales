// элементы со страницы
const citiesFrom = document.querySelector('.input__cities-from'),
      formSearch = document.querySelector('.form-search'),
      dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
      dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
      citiesTo = document.querySelector('.input__cities-to');

// данные
let city = [];

const citiesApi = 'dataBase/cities.json',
            proxy = 'https://cors-anywhere.herokuapp.com/';
    
// функции
// функция обрабатывает данные
const getData = (url, callback) => {
    const request = new XMLHttpRequest(); // создаем объект запроса
    
    request.open('GET', url);// настраиваем объект запроса
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200) {
            callback(request.response);
        } else {
            console.error(request.status);
        }
    });
    request.send();
};

const showCity = (input, list) => {
    list.textContent = ''; //  очистили наш список городов  die Liste der Städte gelöscht
    
    if (input.value !== '') { // если непустой наш инпут
        const filterCity = city.filter((item) => { // die Städte im Array durchgehen   перебираем города в массиве
            const fixItem = item.name.toLowerCase(); //все с маленькой буквы   alle mit einem kleinen Buchstaben
            return fixItem.includes(input.value.toLowerCase());

        });
        
        filterCity.forEach((item) => {  //создаем новый элемент в списке einen neuen Element in der Liste erstellen
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li);
        });
        }
};

const selectCity = (event, input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {  // обезопасим, что именно на кликнули на li
        input.value = target.textContent;
        list.textContent = '';
    }
};

// обработчики событий
citiesFrom.addEventListener('input', () => { // пишем стрелочную, иначе если просто () то сразу будет вызов ф-ции
    showCity(citiesFrom, dropdownCitiesFrom);
});

citiesTo.addEventListener('input', () => {
    showCity(citiesTo, dropdownCitiesTo);
});

dropdownCitiesFrom.addEventListener('click', (event) => {
    selectCity(event, citiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener('click', (event) => {
    selectCity(event, citiesTo, dropdownCitiesTo);
});

// вызовы функций 
getData(citiesApi, (data) => { 
    //распарсим данные 
    city= JSON.parse(data).filter(item => item.name);   // если у нас в базе данных есть город, так как там есть и null
    console.log(city);
});

