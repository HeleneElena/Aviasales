// элементы со страницы
const citiesFrom = document.querySelector('.input__cities-from'),
      formSearch = document.querySelector('.form-search'),
      dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
      dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
      inputDateDepart = document.querySelector('.input__date-depart'),
      citiesTo = document.querySelector('.input__cities-to');

// данные
let city = [];

const citiesApi = 'dataBase/cities.json',
      proxy = 'https://cors-anywhere.herokuapp.com/',
      calendar = 'http://map.aviasales.ru/supported_directions.json?origin_iata=LED&one_way=false&locale=ru',
      API_KEY = 'a4e0a3dc535cb2be0d94433e4f9ab05d'; // на сайте туркомпании зарегилась, там ключ бесплатно
    
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

const renderCheap = (data, date) => {
    const cheapTicetYear = JSON.parse(data).best_prices; // билеты бэст-прайсес там отборка наших билетов
    console.log('cheapTicetYear: ', cheapTicetYear);

    const cheapTicetDay = cheapTicetYear.filter((item) => {
        return item.depart_date === date;  //департ_дэйт это дата отправки, она должна совпадать
    });
    console.log('cheapTicetDay: ', cheapTicetDay);
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

formSearch.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = { // эти данные нужны для запроса на сервер
        from: city.find((item) => citiesFrom.value === item.name).code, // сравниваем, что получили в форме, возвращается один элемент, который найдет find
        to: city.find((item) => citiesTo.value === item.name).code, // свойство code дает нам код конкретного города, который юзер набирает в поиске
        when: inputDateDepart.value,
    };

    const requestData = '?depart_date=' + formData.when + 
          '&origin=' + formData.from +
          '&destination=' + formData.to + 
          '&one_way=true';

          getData(calendar + requestData, (response) => {
            renderCheap(response, formData.when); // (то, что получили от сервера, дата)
          });

});

// вызовы функций 
getData(proxy + citiesApi, (data) => { 
    //распарсим данные 
    city = JSON.parse(data).filter(item => item.name);   // если у нас в базе данных есть город, так как там есть и null
});

//getData(proxy + calendar + '?depart_date=2022-05-29&origin=SVX&destination=KGD&one_way+true&token=' + API_KEY, (data) => { 
       // const cheapTicket = JSON.parse(data).best_prices.filter(item => item.depart_date === '2022-05-29');
        //console.log(cheapTicket); 
//});
