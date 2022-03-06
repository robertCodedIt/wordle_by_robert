(function gameSetup() {
    const axios = require('axios');

    let tileView = document.querySelector('.tile-container');

    let keyboard = document.querySelector('.keyboard-container');

    let messageContainer = document.querySelector('.message-container');

    let wordle = "SUPER"
    let guessRows = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ]

    let currentRow = 0;
    let currentTile = 0;
    let gameOver = false



    guessRows.forEach((guessRow, idx) => {
        const row = document.createElement('div');
        row.setAttribute('id', `guessRow:${idx}`);

        guessRow.forEach((guess, gIdx) => {
            tile = document.createElement('div');
            tile.setAttribute('id', `guess-row:${idx}:guess:${gIdx}`)
            row.append(tile)
            tile.classList.add('tile');
        })

        tileView.appendChild(row)
    })

    let keys = [
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
        'A',
        'S',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'ENTER',
        'Z',
        'X',
        'C',
        'V',
        'B',
        'N',
        'M',
        '<<'
    ]
    const addLetter = (letter) => {
        if (currentTile < 5 && currentRow < 6) {

            let tile = document.getElementById(`guess-row:${currentRow}:guess:${currentTile}`)
            tile.textContent = letter
            guessRows[currentRow][currentTile] = letter;
            tile.setAttribute('data', letter)
            currentTile++
        } else {
            alert(`current Tile is ${currentTile} please submit your response or retry`)
        }


    }
    const handleKeyChoice = (letter) => {
        if (letter === '<<') {
            deleteLetter()
            return
        }
        if (letter === "ENTER") {
            checkRow()
            return
        }
        // alert(`you clicked ${key} `);
        addLetter(letter)

    }
    keys.forEach(key => {
        let button = document.createElement('button');
        button.textContent = key;
        button.setAttribute('id', key)
        button.addEventListener('click', () => handleKeyChoice(key))
        keyboard.append(button)
    })

    const deleteLetter = () => {
        if (currentTile > 0) {
            currentTile--
            const tile = document.getElementById(`guess-row:${currentRow}:guess:${currentTile}`)
            tile.textContent = '';
            guessRows[currentRow][currentTile] = '';
            tile.setAttribute('data', '');

        }

    }

    const checkRow = () => {
        const guess = guessRows[currentRow].join('')

        if (currentTile > 4) {
            setColor()
            console.log(`guess = ${guess} wordle = ${wordle}`)
            if (guess.toLowerCase() == wordle.toLowerCase()) {
                showMessage('Great!')
                gameOver = true;
                return
            }
            else {
                if (currentRow >= 5) {
                    gameOver = false;
                    showMessage('Game Over')
                    return
                }
                if (currentRow < 5) {
                    currentRow++;
                    currentTile = 0;
                }
            }
        }
    }

    const showMessage = (msg) => {
        const messageEl = document.createElement('p');
        messageEl.textContent = msg
        messageContainer.append(messageEl)
        setTimeout(() => messageContainer.removeChild(messageEl), 2000)
    }
    const setColor = () => {


        const rowTiles = document.getElementById(`guessRow:${currentRow}`).childNodes

        let checkWordle = wordle;
        let guess = [];

        // set default gray overlay
        rowTiles.forEach(tile => {
            guess.push({ letter: tile.getAttribute('data'), color: 'gray' })

        })
        // set green overlay if correct letter 
        guess.forEach((guess, idx) => {
            if (guess.letter == wordle[idx]) {
                guess.color = 'green';


            }
            // set yellow overlay if a correct letter is included in the row
            else if (checkWordle.includes(guess.letter)) {
                guess.color = 'yellow';
                checkWordle = checkWordle.replace(guess.letter, '');
            }
        })

        rowTiles.forEach((tile, idx) => {
            setTimeout(() => {
                tile.classList.add('flip')
                tile.classList.add(guess[idx].color);
                addColorToKeys(guess[idx].letter, guess[idx].color)
            }, 500 * idx)
        })
    }

    const addColorToKeys = (letter, keyColor) => {
        const key = document.getElementById(letter);
        key.classList.add(keyColor)

    }
})()