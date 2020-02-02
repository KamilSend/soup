$.getJSON('table.json', function(data){

    const buttons = document.querySelectorAll('button'); //node.list zawierająca wszystkie przyciski warzyw
    const ingredients = []; //tablica wszystkich wybranych składników
    const nowButton = document.querySelector('.now');
    const display = document.querySelector('.displayResult')

    let now;
    let hour;
    let minute;

    function leadingZero(i) {
        return (i < 10)? "0"+i : i;
    }

    const timeInput = document.getElementById('timeInput');

    setInterval(function(){
        nowButton.addEventListener('click', function(){
            now = new Date();
            hour = now.getHours(); //wyciągnięcie godzin z czasu
            hour=leadingZero(hour);
            minute = now.getMinutes(); //wyciągnięcie minut z czasu
            minute = leadingZero(minute);
            timeInput.value = hour + ":" + minute;
            //timeInput.value = new Date().getHours() + ":" + new Date().getMinutes();
            new Date([[]]);
        });




        now = new Date(`December 17, 1995 ${timeInput.value}`); //pobranie czasu systemowego
        hour = now.getHours(); //wyciągnięcie godzin z czasu
        minute = now.getMinutes(); //wyciągnięcie minut z czasu


        /*nowButton.addEventListener('click', function(){
            now = new Date();
            hour = now.getHours(); //wyciągnięcie godzin z czasu
            minute = now.getMinutes(); //wyciągnięcie minut z czasu
        });*/

    /*hour = now.getHours(); //wyciągnięcie godzin z czasu
    minute = now.getMinutes(); //wyciągnięcie minut z czasu*/

    }, 1000);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function table(){
            ingredients.push(data.components[i].component); //dodawanie klikniętych elementów do tablicy
            ingredients.sort(function(a, b) { //posortowanie tablicy
                return a.value - b.value;
            });
            ingredients.reverse(); //odwrócenie tablicy żeby pierwsze były największe wartości
        })
    }

document.querySelector('.result').addEventListener('click', function(){//funkcja pokazująca wynik w konsoli
    console.log(`Najsampierw wrzuć ${ingredients[0].name} o ${hour}:${minute}`);
    display.textContent =`Najsampierw wrzuć ${ingredients[0].name} o ${hour}:${minute}`;
    for (let i = 1; i < (ingredients.length); i++) {

        const addingMinutes = ingredients[0].value - ingredients[i].value; //po jakim czasie od rozpoczęcia gotowania wrzucić
        let addingTime = minute + addingMinutes;
        let addingHour = hour;
        //zadziała tylko jeśli nie trzeba będzie przerzucać godziny więcej niż raz, czyli wywali się przy różnicach większych od godziny
        if(addingTime>59 && (addingHour - hour <=1)){
            addingTime = addingTime - 60;
            addingHour +=1;
        }
        console.log(`o ${addingHour} : ${addingTime} wrzuć ${ingredients[i].name}`);
        display.textContent += ` o ${addingHour} : ${addingTime} wrzuć ${ingredients[i].name}`;
    }
})

});