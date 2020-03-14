$.getJSON('table.json', function(data){

    const buttons = document.querySelectorAll('button'); //node.list zawierająca wszystkie przyciski składników
    const ingredients = []; //tablica wszystkich wybranych składników
    const nowButton = document.querySelector('.now');
    const display = document.querySelector('#displayResult');

    let now;
    let hour;
    let minute;


    //funkcja dodająca zero, jeżeli jest mniej niż 10 minut-----------------------------------
    function leadingZero(i) {
        return (i < 10)? "0"+i : i;
    }


    //wczytanie obecnego czasu------------------------------------------------------------------------
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

    }, 1000);

   //tworzenie przycisków ze składnikami-----------------------------------------------------------




   //wybieranie składników-------------------------------------------------------------------------
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function table(){
            buttons[i].classList.toggle('btnActive');//zaznaczenie wybranego składnika
            if (buttons[i].classList.contains('btnActive')){
                ingredients.push(data.components[i].component); //dodawanie klikniętych elementów do tablicy
                ingredients.sort(function(a, b) { //posortowanie tablicy
                    return a.value - b.value;
                });
                ingredients.reverse(); //odwrócenie tablicy żeby pierwsze były największe wartości
            }
            else{
                ingredients.pop(data.components[i].component);
            }
        })
    }

    //obliczanie czasów dodawania składników--------------------------------------------------------
    document.querySelector('.result').addEventListener('click', function(){

            //przewijanie jquery
            // $('#result').click(function(){
            //     $("html, body").animate({ scrollTop: 0 }, 500);
            //     return false;
            // });

        //display.textContent +=`Najpierw wrzuć ${ingredients[0].name} o ${hour}:${minute}`;
        display.innerHTML +=`Najpierw wrzuć ${ingredients[0].name} o ${hour}:${minute}`;
        for (let i = 1; i < (ingredients.length); i++) {

            const addingMinutes = ingredients[0].value - ingredients[i].value; //po jakim czasie od rozpoczęcia gotowania wrzucić
            let addingTime = minute + addingMinutes;
            let addingHour = hour;
            //zadziała tylko jeśli nie trzeba będzie przerzucać godziny więcej niż raz, czyli wywali się przy różnicach większych od godziny
            if(addingTime>59 && (addingHour - hour <=1)){
                addingTime = addingTime - 60;
                addingHour +=1;
            }
            addingTime = leadingZero(addingTime);
            addingHour = leadingZero(addingHour);
            //display.textContent += ` o ${addingHour} : ${addingTime} wrzuć ${ingredients[i].name}`;

            const el = [];//utworzenie tablicy elementów div w których będą wyświetlane kolejne czasy
            el[i] =document.createElement("div");
            el[i].textContent = ` o ${addingHour} : ${addingTime} wrzuć ${ingredients[i].name}`;
            display.appendChild(el[i]);
            display.classList.add('active');
            document.getElementById('cover').classList.add('active');
            el[i] = '';

            document.querySelector('.close').addEventListener('click', function(){
                display.classList.remove('active');
                document.querySelector('#cover').classList.remove('active');
                display.innerHTML ='<div id="close" class="close">X</div>';
            });

        }
    });

});

