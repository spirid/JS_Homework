// Задание 1
// Использование let
// Использование деструктуризации
// Использование rest-параметра
{
    let {a, b, ...obj} = {a: 1, b: 2, c: 3, d: 4};
}

// Задание 2
// Использование let, const
// Использование сокращений свойств и методов объекта
// Использование шаблонных строк
{
    let name = prompt('Введите ваше имя');

    const user = {
        name,
        sayHi() {
            return `Hi, ${this.name}!`;
        }
    };

    user.sayHi();
}

// Задание 3
// Использование деструктуризации
// Использование задания значения параметров функции по-умолчанию
// Использование короткого синтаксиса возведения в степень
{
    function pow({a: x, b: y}, z = 1) {
        return x ** y * z;
    }

    pow({a: 2, b: 3}, 2);
}

// Задание 4
// Использование spread-оператора
// Использование шаблонных строк
{
    const info = ['Alesya', 25];

    function getUserInfo(name, age) {
        return `Hello, I'm ${name} and I'm ${age} years old.`;
    }

    getUserInfo(...info);
}

// Задание 5
// Использование rest-параметра
// Использование цикла for of
{
    function getNumbers(...numbers) {
        for (let val of numbers) {
            console.log(val);
        }
    }

    getNumbers(1, 2, 3, 4, 5);
}

// Задание 6
// Использование перебирающего метода forEach()
// Использование стрелочной функции с 1 параметром и 1 действием
// Использование поиска элемента в массиве
{
    function countVowelLetters(text) {
        const vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'];
        let counter = 0;

        text.toLowerCase().split('').forEach(letter => counter += +vowelLetters.includes(letter));

        return counter;
        // return text.toLowerCase().split('').filter(letter => vowelLetters.includes(letter)).length;
    }

    countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12
}

// Задание 7
// Использование перебирающих методов filter() и find()
// Использование поиска подстроки в строке
{
    function filterUsers(users) {
        return {
            ['Пользователи младше 40']: users.filter(user => user.age < 40),
            ['Пользователь с именем Федор']: users.find(user => user.name.startsWith('Fedor'))
        };
    }

    filterUsers([
        {name: 'Vasya Pupkin', age: 25},
        {name: 'Ivan Petrov', age: 30},
        {name: 'Fedor Ivanov', age: 42}
    ]);
}

// Задание 8
// Использование перебирающего метода map()
// Использование стрелочной функции с 2 параметрами, 1 действием и возвратом объекта
// Использование динамического ключа объекта
{
    function mapUserInfo(userNames) {
        return userNames.map((username, i) => ({[`Пользователь ${i + 1}`]: username}));
    }

    mapUserInfo(['Alesya', 'Vasya', 'Piotr']);
}

// Задание 9
// Использование перебирающего метода reduce()
// Использование метода Object.assign()
{
    function concatObjects(objects) {
        return objects.reduce((previous, current) => Object.assign(previous, current), {});
    }

    concatObjects([
        {name: 'Vasya'},
        {name: 'Piotr', age: 25},
        {salary: '2000$'}
    ]);
}

// Задание 10
// Использование нового синтаксиса классов и наследования
// Использование шаблонных строк с вызовом функции
{
    class Animal {
        constructor(name) {
            this.name = name;
            this._foodAmount = 50;
        }

        _formatFoodAmount() {
            return `${this._foodAmount} гр.`;
        }

        dailyNorm(amount) {
            if (!arguments.length) return this._formatFoodAmount();

            if (amount < 50 || amount > 500) {
                return 'Недопустимое количество корма.';
            }

            this._foodAmount = amount;
        }

        feed() {
            console.log(`Насыпаем в миску ${this.dailyNorm()} корма.`);
        }
    }

    class Cat extends Animal {
        feed() {
            super.feed();

            console.log('Кот доволен ^_^');
            return this;
        }

        stroke() {
            console.log('Гладим кота.');
            return this;
        }
    }

    let barsik = new Cat('Барсик');

    console.log(barsik.feed().stroke().stroke().feed());

    barsik = null;
}

// Задание 11
// Использование промисов
// Использование метода Number.isInteger()
// Использование деструктуризации
{
    function createPromise(a, b) {
        return new Promise((resolve, reject) => {
            if (Number.isInteger(a) && Number.isInteger(b)) {
                (a > b) && ([a, b] = [b, a]);

                const timer = setInterval(() => {
                    if (a === b) {
                        clearInterval(timer);
                        resolve(a);
                    }

                    console.log(a++);
                }, 1000);
            } else reject('Введите целые числа');
        });
    }

    createPromise(5, 10)
        .then(result => console.log(`Последнее запомненное значение: ${result}`))
        .catch(error => console.log(error));
}
