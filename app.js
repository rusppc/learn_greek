// Создаем словарь с парами слов на английском и русском языках
var dictionary = {
  "cat": "кот",
  "dog": "собака",
  "bird": "птица",
  "fish": "рыба",
  "apple": "яблоко",
  "banana": "банан",
  "orange": "апельсин",
  "car": "машина",
  "bus": "автобус",
  "bike": "велосипед",
  "book": "книга",
  "pen": "ручка",
  "table": "стол",
  "chair": "стул",
  "window": "окно",
  "door": "дверь"
};

// Создаем массив из ключей словаря
var keys = Object.keys(dictionary);

// Создаем переменные для хранения счета, времени и статуса игры
var score = 0;
var time = 60;
var game_over = false;

// Создаем переменную для хранения выбранного слова
var selected_word = null;

// Создаем функцию для генерации случайного числа в заданном диапазоне
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Создаем функцию для запуска игры
function start() {
  // Очищаем контейнер для слов
  $("#words").empty();
  // Генерируем восемь случайных слов на английском языке
  var english_words = [];
  for (var i = 0; i < 8; i++) {
    var index = random(0, keys.length - 1);
    var word = keys[index];
    english_words.push(word);
    // Удаляем слово из массива ключей, чтобы не повторяться
    keys.splice(index, 1);
  }
  // Генерируем восемь соответствующих слов на русском языке
  var russian_words = [];
  for (var i = 0; i < 8; i++) {
    var word = dictionary[english_words[i]];
    russian_words.push(word);
  }
  // Перемешиваем русские слова
  russian_words.sort(function() {
    return 0.5 - Math.random();
  });
  // Создаем восемь элементов для английских слов и добавляем их в контейнер
  for (var i = 0; i < 8; i++) {
    var word = english_words[i];
    var element = $("<div></div>").addClass("word").text(word);
    $("#words-eng").append(element);
  }
  // Создаем восемь элементов для русских слов и добавляем их в контейнер
  for (var i = 0; i < 8; i++) {
    var word = russian_words[i];
    var element = $("<div></div>").addClass("word").text(word);
    $("#words-gr").append(element);
  }
  // Обнуляем счет
  score = 0;
  // Обновляем текст элемента для счета
  $("#score").text("Score: " + score);
  // Устанавливаем время
  time = 60;
  // Обновляем текст элемента для времени
  $("#time").text("Time: " + time);
  // Устанавливаем статус игры
  game_over = false;
  // Скрываем элемент для конца игры
  $("#game-over").hide();
  // Запускаем таймер
  var timer = setInterval(function() {
    // Уменьшаем время на одну секунду
    time--;
    // Обновляем текст элемента для времени
    $("#time").text("Time: " + time);
    // Если время истекло
    if (time == 0) {
      // Останавливаем таймер
      clearInterval(timer);
      // Устанавливаем статус игры
      game_over = true;
      // Показываем элемент для конца игры
      $("#game-over").show();
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

// При загрузке документа
$(document).ready(function() {
  // Привязываем функцию к событию нажатия на слово
  $("#words").on("click", ".word", on_word_click);
  // Запускаем игру
  start();
});
