const citiesFrom = document.querySelector('.input__cities-from'),
      formSearch = document.querySelector('.form-search'),
      dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
      dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
      citiesTo = document.querySelector('.input__cities-to');

const city = ['Muenchen', 'Rosenheim', 'Leipzig', 'Moskau', 'Dresden', 'Praga', 
'Novgorod', 'Novosibirsk', 'Kemerovo', 'Pekin', 'Rom', 'Wien']

citiesFrom.addEventListener('input', () => {
    dropdownCitiesFrom.textContent = ''; //  очистили наш список городов  die Liste der Städte gelöscht
    


    const filterCity = city.filter((item) => { // die Städte im Array durchgehen   перебираем города в массиве
        const fixItem = item.toLowerCase(); //все с маленькой буквы   alle mit einem kleinen Buchstaben
        return fixItem.includes(citiesFrom.value.toLowerCase());
    });
    
    filterCity.forEach((item) => {  //создаем новый элемент в списке einen neuen Element in der Liste erstellen
        const li = document.createElement('li');
        li.classList.add('dropdown__city');
        li.textContent = item;
        dropdownCitiesFrom.append(li);
    });
});

citiesTo.addEventListener('input', () => {
    dropdownCitiesTo.textContent = ''; //  очистили наш список городов  die Liste der Städte gelöscht

    const filterCity = city.filter((item) => { // die Städte im Array durchgehen   перебираем города в массиве
        const fixItem = item.toLowerCase(); //все с маленькой буквы   alle mit einem kleinen Buchstaben
        return fixItem.includes(citiesTo.value.toLowerCase());
    });
    
    filterCity.forEach((item) => {  //создаем новый элемент в списке einen neuen Element in der Liste erstellen
        const li = document.createElement('li');
        li.classList.add('dropdown__city');
        li.textContent = item;
        dropdownCitiesTo.append(li);
    });
});