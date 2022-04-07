const section = document.querySelector('section');
const input = document.querySelector('input');
let end = document.querySelector('.wrapper.box .end');
let guessedLetter = new Set();
let text = '';
let category = '';
const quote = document.querySelector('.word');
let currentStep = 0;
let wrapperEnd = '';
let wrapperBox = '';
let btnEnd = document.querySelector('button.end');

quotes = [{
    text: 'skazani na shawshank',
    category: 'film'
}, {
    text: 'zielona mila',
    category: 'film'
}, {
    text: 'forrest gump',
    category: 'film'
}, {
    text: 'ogniem i mieczem',
    category: 'dzieło literackie'
}, {
    text: 'lalka',
    category: 'dzieło literackie'
}, {
    text: 'jak trwoga to do boga',
    category: 'przysłowie'
}, {
    text: 'czekolada',
    category: 'jedzenie'
}, {
    text: 'leonardo di caprio',
    category: 'aktor'
}, {
    text: 'emma stone',
    category: 'aktorka'
}, {
    text: 'komputer',
    category: 'rzecz'
}]

document.querySelectorAll('.hangman').forEach(image => {
    image.style.display = 'none'
})
document.querySelector('.s0').style.display = 'block';

const takeLetter = (e) => {
    e.target.value = e.target.value.slice(-1).toUpperCase();
}

const displayQuote = () => {
    const randIndex = Math.floor(Math.random() * quotes.length);
    text = quotes[randIndex].text;
    category = quotes[randIndex].category;

    showWord(text);
    document.querySelector('.category').innerHTML = category;
}

const btnCheck = document.querySelector('.input button');
btnCheck.addEventListener('click', function () {
    checkLetter(input.value, text.toUpperCase())
});

function checkLetter(letter, word) {
    if (word.includes(letter)) {
        guessedLetter.add(letter);
    } else {
        currentStep++;
    }
    showWord(text);
    drawHangman(text);
    input.value = '';
}

const showWord = (word) => {
    let content = '';
    const arrGuessed = Array.from(guessedLetter);
    for (let i = 0; i < word.length; i++) {
        if (arrGuessed.includes(word[i].toUpperCase())) {
            content += word[i];
        } else if (word[i] === ' ') {
            content += ' ';
        } else {
            content += '_';
        }
    }
    quote.innerHTML = content;
};


function startAgain() {
    document.querySelector('.wrapper.box').style.visibility = 'hidden';
    document.querySelector('.guessing').style.visibility = 'hidden';
    displayQuote();
    guessedLetter.clear();
    showWord(text);
    document.querySelectorAll('.hangman').forEach(image => {
        image.style.display = 'none'
    })
    document.querySelector('.s0').style.display = 'block';
    currentStep = 0;
};

function showBox(argument) {
    setTimeout(() => {
        document.querySelector('.wrapper.box').style.visibility = 'visible';
        if (argument) {
            end.innerHTML = 'KONIEC GRY! PRZEGRANA!';
        } else {
            end.innerHTML = 'WYGRANA!';
        }
    }, 200);
}

const drawHangman = (word) => {
    const arrGuessed = Array.from(guessedLetter)
    if (!arrGuessed.includes(word.toUpperCase())) {
        for (let i = 0; i <= 9; i++) {
            if (i <= currentStep) {
                document.querySelector('.s' + i + '').style.display = 'block';
            }
        }
        if (currentStep === 9 || !quote.innerHTML.includes('_')) {
            showBox(currentStep === 9)
        }
    }
}

function showGuessed() {
    document.querySelector('.guessing').style.visibility = 'visible';
    document.querySelector('.password').value = '';
}

function checkPassword(guessedPassword) {
    showBox(guessedPassword.toLowerCase() !== text);
};

document.querySelector('.startAgain').addEventListener('click', startAgain);

displayQuote();

input.addEventListener('input', takeLetter);

document.querySelector('.guessed').addEventListener('click', showGuessed)

document.querySelector('.check').addEventListener('click', () => {
    checkPassword(document.querySelector('input.password').value)
});

btnEnd.addEventListener('click', () => {
    startAgain();
})