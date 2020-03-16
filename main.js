$.getJSON('table.json', function(data){

    const buttons = document.querySelectorAll('button'); //node.list zawierająca wszystkie przyciski składników
    const ingredients = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]; //tablica wszystkich wybranych składników
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
   //  for (let i = 0; i < buttons.length; i++) {
   //      buttons[i].addEventListener('click', function table(){
   //          console.log(ingredients);
   //          buttons[i].classList.toggle('btnActive');//zaznaczenie wybranego składnika
   //          if (buttons[i].classList.contains('btnActive')){
   //              ingredients.push(data.components[i].component); //dodawanie klikniętych elementów do tablicy
   //              ingredients.sort(function(a, b) { //posortowanie tablicy
   //                  return a.value - b.value;
   //              });
   //              ingredients.reverse(); //odwrócenie tablicy żeby pierwsze były największe wartości
   //          }
   //          else{
   //              ingredients.pop(data.components[i].component);
   //          }
   //      })
   //  }

     for (let i = 0; i < buttons.length; i++) {
         buttons[i].addEventListener('click', function table(){
             //console.log(ingredients);
             buttons[i].classList.toggle('btnActive');//zaznaczenie wybranego składnika
             if (buttons[i].classList.contains('btnActive')){
                 ingredients[i]=data.components[i].component;
                 //ingredients.push(data.components[i].component); //dodawanie klikniętych elementów do tablicy
             }
             else{
                 ingredients.splice(i, 1,0);
                 //console.log(ingredients);
             }
         })
     }

    //obliczanie czasów dodawania składników--------------------------------------------------------
    document.querySelector('.result').addEventListener('click', function(){
        //console.log(ingredients);
        let helpingTable = ingredients.slice();
        //const finalIngredients = [];

        for (let i = (ingredients.length-1); i >=0; i--) {
            if (ingredients[i] === 0){
                helpingTable.splice(i,1);

                //console.log(ingredients);
                //console.log(helpingTable);
            }
        }

        function compareScore(a, b) {
            return a.value - b.value;
        }

        helpingTable.sort(compareScore);

        helpingTable.reverse();
        console.log(ingredients);
        console.log(helpingTable);

            if(helpingTable.length>1){
            display.innerHTML +=`First add ${helpingTable[0].name} at ${leadingZero(hour)}:${leadingZero(minute)}`;
            for (let i = 1; i < (helpingTable.length); i++) {
                if(helpingTable[i]!==0){
                const addingMinutes = helpingTable[0].value - helpingTable[i].value; //po jakim czasie od rozpoczęcia gotowania wrzucić
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
                el[i].textContent = ` at ${addingHour} : ${addingTime} add ${helpingTable[i].name}`;
                display.appendChild(el[i]);
                display.classList.add('active');
                document.getElementById('cover').classList.add('active');
                el[i] = '';}

                document.querySelector('.close').addEventListener('click', function(){
                    display.classList.remove('active');
                    document.querySelector('#cover').classList.remove('active');
                    display.innerHTML ='<div id="close" class="close">X</div>';
                });

            }
        }
            else if (helpingTable.length===1 || helpingTable.length===0){
                window.alert("You need to choose at least two ingredients");
            }


        // else if (ingredients.length==1){
        //     console.log(ingredients);
        //     display.innerHTML +=`First add ${ingredients[0].name} at ${hour}:${minute}`;
        //     display.classList.add('active');
        //     document.getElementById('cover').classList.add('active');
        //
        //     document.querySelector('.close').addEventListener('click', function(){
        //         display.classList.remove('active');
        //         document.querySelector('#cover').classList.remove('active');
        //         display.innerHTML ='<div id="close" class="close">X</div>';
        //     });
        // }
    });


});


