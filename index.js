(function gameSetup() {

let tileView = document.querySelector('.tile-container');

let keyboard = document.querySelector('.keyboard-container');

let guessRows = [
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','','']
]

guessRows.forEach((guessRow,idx)=>{
    const row = document.createElement('div');
    row.setAttribute('id', 'guessRow-' +idx);

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
const handleKeyChoice = ()=>{

        alert(`you clicked `);
    
}
keys.forEach(key=>{
    let button = document.createElement('button');
    button.textContent = key;
    button.setAttribute('id',key)
    button.addEventListener('click',handleKeyChoice)
    keyboard.append(button)
})















})()