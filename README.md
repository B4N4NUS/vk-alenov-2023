# Профильное задание Фронтенд-разработчик (B2B) Стажировка в VK
## Выполнил Аленов Михаил

Проект создан через `create-react-app` и использует лишь базовый набор библиотек, предоставляемых вышеописанной утилитой

## Потыкаться без билда
Проект развернут через сервис Vercel https://vk-alenov-2023.vercel.app/

## Как билдить

Перейдите в директорию проекта и введите в терминале сначала `npm i`, затем `npm start`

# Исходное задание

Уважаемый кандидат, тебе предлагается создать форму
бронирования переговорной.
Форма должна содержать следующие элементы:
* выпадающий список с выбором башни (А или Б)
* выпадающий список с выбором этажа (с 3 по 27)
* выпадающий список с выбором переговорки. На каждом этаже 10 переговорок 
* выбор даты и интервала времени (в произвольном виде, например выпадающие списки, data-picker)
• поле ввода комментария (textarea)
• кнопка "Отправить" (по нажатию - выводить в консоль данные формы в виде json)
• кнопка "Очистить" (по нажатию очищает форму)
Код необходимо писать либо на чистом JavaScript, либо с
использованием React.
При выполнении задания можно пользоваться
готовыми библиотеками компонентов, в верстке
желательно использовать флексбоксы.

# Особенности реализации

* Не используются библиотеки готовых компонентов
* Код написан с использованием React
* Маштабируемость. Реализована подгрузка информации о наполнении формы из конфига с характеристикой башнен, этажей и т.д. 

# Отладка и тестирование

* Тестирование проводилось на ПК в браузерах Chrome(112.0.5615.140) и Firefox(113.0), а также в Chrome(112.0.5615.135) для Android устройств
