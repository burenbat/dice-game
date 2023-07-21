//******************  Тоглоомын бүх газарт ашиглагдах глобаль хувьсагдыг энд зарлая *******************/

// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;

// Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
var activePlayer;

// Хоёр тоглогчийн цуглуулсан оноонууд
var scores;

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore;

// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалья
var diceDom = document.querySelector(".dice");

//Тоглоомыг эхлүүллээ
initGame();

// Тоглоомыг шинээр эхлэхэд бэлтгэнэ.
function initGame(){
    // Тоглоом эхэллээ гэдэг төлөвт оруулна.
    isNewGame = true;

    activePlayer = 0;
    // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
    scores = [0, 0];

    // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;

    // Програм эхлэхэд бэлтгэе
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';

    // Тоглогчдын нэрийг буцааж гаргах
    document.getElementById('name-0').textContent = "Тоглогч 1";
    document.getElementById('name-1').textContent = "Тоглогч 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    diceDom.style.display = "none";
}


// Шоог шидэх эвэнт листенер
document.querySelector(".btn-roll").addEventListener("click", function (){

    if(isNewGame){
        
        //Дуу оруулах
        var audio = new Audio("dice.mp3");
        audio.play();

        // 1 - 6 доторх санамсаргүй нэг гоо гаргаж авна
        var diceNumber = Math.floor(Math.random() * 6) + 1;

        // Шооны зургийг вэб дээр гаргаж ирнэ.
        diceDom.style.display = "block";

        // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
        diceDom.src = 'dice-' + diceNumber + '.png';

        // Буусан тоо нь 1 ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
        if(diceNumber !== 1 ){
            // 1 - ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
            roundScore = roundScore + diceNumber;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        }else{
            // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө

            // Энэ тоглогчийн ээлжид цуглуулсан оноог 0 болгоно
            switchToNextPlayer();
        
        }
        
    } else {
        alert('Тоглоом дууссан байна. START GAME товч дээр дарж шинээр эхлүүлнэ үү!');
    }
    
});

// HOLD товчны эвэнт листенер
document.querySelector(".btn-hold").addEventListener("click", function (){
    // Уг тоглогчийн цуглуулсан ээлжийн оноог глобаль оноон дээр нь нэмж өгнө
    if(isNewGame){

        /*if(activePlayer === 0){
            scores[0] = scores[0] + roundScore; 
        }else{
            scores[1] = scores[1] + roundScore;
        }*/
        scores[activePlayer] = scores[activePlayer] + roundScore;
        

        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // Уг тоглогч хожсон эсэхийг (оноо нь 100-с их эсэх) шалгах.
        if(scores[activePlayer] >= 100){
            // Тоглоомыг дууссан төлөвт оруулна
            isNewGame = false;
            // Ялаг гэсэн текстийг нэрийнх нь оронд гаргана.
            document.getElementById('name-' + activePlayer).textContent = "ЯЛАГЧ!!!";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            switchToNextPlayer();
        }

    } else {
        alert('Тоглоом дууссан байна. START GAME товч дээр дарж шинээр эхлүүлнэ үү!');
    }

    

});

// Энэ функц нь тоглох ээлжийг дараагийн ээлжрүү шилжүүлдэг
function switchToNextPlayer(){
    // Ээлийн оноог нь 0 болгоно
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;

    //Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    // Улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // Шоог түр алга болглно
    diceDom.style.display = "none";
}

//New Game буюу Шинэ тоглоом эхлүүлэх товчны эвент листенер
document.querySelector('.btn-new').addEventListener('click', initGame);


