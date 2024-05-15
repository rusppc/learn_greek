// В скрипте на стороне клиента
// Получение параметров URL
var params = new URLSearchParams(window.location.search);
var dictionaryParam = params.get('dictionary');

// Десериализация JSON
if (dictionaryParam) {
  var dictionary = JSON.parse(decodeURIComponent(dictionaryParam));
  // Теперь dictionary - это объект JavaScript, который можно использовать как словарь
}


// Перезаписываем словарь с парами слов на английском и русском языках
var dictionary = {
    "0": "μηδέν",
    "1": "ένα",
    "2": "δύο",
    "3": "τρία",
    "4": "τέσσερα",
    "5": "πέντε",
    "6": "έξι",
    "7": "επτά",
    "8": "οκτώ",
    "9": "εννέα",
    "10": "δέκα",
    "11": "έντεκα",
    "12": "δώδεκα",
    "13": "δεκατρία",
    "14": "δεκατέσσερα",
    "15": "δεκαπέντε",
    "16": "δεκαέξι",
    "17": "δεκαεπτά",
    "18": "δεκαοκτώ",
    "19": "δεκαεννέα",
    "20": "είκοσι",
    "30": "τριάντα",
    "40": "σαράντα",
    "50": "πενήντα",
    "60": "εξήντα",
    "70": "εβδομήντα",
    "80": "ογδόντα",
    "90": "ενενήντα",
    "100": "εκατό",
    "200": "διακόσια",
    "300": "τριακόσια",
    "400": "τετρακόσια",
    "500": "πεντακόσια",
    "600": "εξακόσια",
    "700": "επτακόσια",
    "800": "οκτακόσια",
    "900": "εννιακόσια",
    "1000": "χίλια",
    "2000": "δύο χιλιάδες",
    "3000": "τρεις χιλιάδες",
    "4000": "τέσσερις χιλιάδες",
    "5000": "πέντε χιλιάδες",
    "6000": "έξι χιλιάδες",
    "7000": "επτά χιλιάδες",
    "8000": "οκτώ χιλιάδες",
    "9000": "εννέα χιλιάδες",
    "1000000": "ένα εκατομμύριο"
};

// Создаем массив из ключей словаря 
var keys = Object.keys(dictionary);

// Создаем переменные для хранения счета, времени и статуса игры
var score = 0;
var time = 180;
var game_over = false;

// Создаем переменную для хранения выбранного слова
var selected_word = null;

// Создаем функцию для генерации случайного числа в заданном диапазоне
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Создаем функцию для запуска игры
var english_words = [];
var russian_words = [];
// var total_words = 0; // Добавляем переменную для общего счета слов

function start() {
  $("#english").empty();
  $("#greek").empty();

  // Скрываем элемент для конца игры
  $("#game-over").hide();
  
  // Генерируем новые слова, если массивы пусты
  if (english_words.length === 0) {
    generateWords();
  }

  // Устанавливаем время
  var time = 180;

  var timer = setInterval(function () {
    time--;
    $("#time").text("Time: " + time);

  // Проверяем, остались ли на странице контейнеры с классом "word"
  var wordContainers = $(".word");
  if (wordContainers.length === 0) {
    // Если контейнеров нет, генерируем новые слова
    generateWords();
  }

    if (time === 0) {
      clearInterval(timer);
      game_over = true;
      $("#game-over").show();

      // Выводим общий счет игрока
      $("#game-over2").text("Total Score: " + score);
    }
  }, 1000);
}

// Создаем функцию для проверки совпадения слов
function check_match(word1, word2) {
  // Если слова являются переводами друг друга
  if (dictionary[word1] == word2 || dictionary[word2] == word1) {
    // Увеличиваем счет на один
    score++;
    // Обновляем текст элемента для счета
    $("#score").text("Score: " + score);
    // Возвращаем true
    return true;
  } else {
    // Возвращаем false
    return false;
  }
}

// Создаем функцию для обработки нажатия на слово
function on_word_click(event) {
  // Если игра не закончена
  if (!game_over) {
    // Получаем элемент, на который нажали
    var element = $(event.target);
    // Получаем текст элемента
    var word = element.text();
    // Если выбрано другое слово
    if (selected_word) {
      // Проверяем совпадение слов
      var match = check_match(selected_word, word);
      // Если слова совпадают
      if (match) {
        // Удаляем элементы для слов
        element.remove();
        $(".selected").remove();
	// Добавляем слово к общему счету
	// total_words++;
      } else {
        // Снимаем выделение с элементов
        element.removeClass("selected");
        $(".selected").removeClass("selected");
      }
      // Очищаем переменную для выбранного слова
      selected_word = null;
    } else {
      // Запоминаем выбранное слово
      selected_word = word;
      // Выделяем элемент
      element.addClass("selected");
    }
  }
}

function generateWords() {

  // Перезапускаем массив из ключей словаря 
  var keys = Object.keys(dictionary);
  
  // Генерируем новые слова
  english_words = [];
  russian_words = [];
  word_count = 4

  for (var i = 0; i < word_count; i++) {
    var index = random(0, keys.length - 1);
    var word = keys[index];
    english_words.push(word);
    keys.splice(index, 1);

  }
  for (var i = 0; i < word_count; i++) {
    var word = dictionary[english_words[i]];
    russian_words.push(word);
  }
  russian_words.sort(function () {
    return 0.5 - Math.random();
  });

  // Отображаем английские слова
  for (var i = 0; i < word_count; i++) {
    var word = english_words[i];
    var element = $("<button></button>").addClass("word").text(word);
    $("#english").append(element);
  }

  // Отображаем русские слова
  for (var i = 0; i < word_count; i++) {
    var word = russian_words[i];
    var element = $("<button></button>").addClass("word").text(word);
    $("#greek").append(element);
  }
}




// При загрузке документа
$(document).ready(function() {
  // Привязываем функцию к событию нажатия на слово
  $("#words").on("click", ".word", on_word_click);
  // Запускаем игру
  start();
});
