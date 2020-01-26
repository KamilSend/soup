$.getJSON('table.json', function(data){

    const buttons = document.querySelectorAll('button'); //node.list zawierająca wszystkie przyciski
    const ingredients = []; //tablica wszystkich wybranych składników

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function table(){
            ingredients.push(data.vegetables[i].vegetable); //dodawanie klikniętych elementów do tablicy
            ingredients.sort(function(a, b) { //posortowanie tablicy
                return a.value - b.value;
            });
            ingredients.reverse(); //odwrócenie tablicy żeby pierwsze były największe wartości
        })
    }

    document.querySelector('.result').addEventListener('click', function(){//funkcja pokazująca wynik w konsoli
        console.log(`Najsampierw wrzuć ${ingredients[0].name}`);
        for (let i = 1; i < (ingredients.length); i++) {
            console.log(`po ${ingredients[0].value - ingredients[i].value} minutach od rozpoczęcia gotowania wrzuć ${ingredients[i].name}`);
        }
    })

});
