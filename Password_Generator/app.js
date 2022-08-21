


const A = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const a = A.map(e => e.toLocaleLowerCase())
const numbers = []
for (let i = 0; i < 10; i++) numbers.push(i)
const symbols = ["~","!","@","#","$","^","&","*","(",")","_","-","=","+","?","/","|","[","]","{","}","<",">",".",",",]
let passwordSymbols = []
function getRandom(arr = []) { return Math.floor( Math.random() * arr.length)}
function getArrRandom(arr = []) { return arr[getRandom(arr)] }

function addOptions() {
    passwordSymbols = []
    let checkboxes = document.querySelectorAll('.check')
    checkboxes.forEach(e => {
        if(e.checked) {
            let state = e.value
            switch (state) {
                
                case 'letter':
                    passwordSymbols.push(A)
                    break
                case 'small':
                    passwordSymbols.push(a)
                    break
                case 'symbol':
                    passwordSymbols.push(symbols)
                    break
                default:
                    passwordSymbols.push(numbers)
            }
        }
    })
    if(passwordSymbols.length === 0) passwordSymbols.push(numbers)
    return passwordSymbols
}

 

function getPassword(){
    let minLength = Number(document.getElementById('min').value)
    let maxLength = Number(document.getElementById('max').value)
    let passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength)
    addOptions()
    let password = ''
    for (let i = 0; i < passwordLength; i++) {
        let type = getArrRandom(passwordSymbols)
        let item = getArrRandom(type)
        password += item
    }
    document.getElementById('password').innerText = password 
    return passwordSymbols
}

document.querySelectorAll('.minMax').forEach(e => e.oninput = (e) => {
    if(+e.target.value < 4) e.target.value = 4
    if(+e.target.value > 120) e.target.value = 120
    let min = document.getElementById('min').value
    let max = document.getElementById('max').value
    if(+max < +min) document.getElementById('min').value = max
})

document.getElementById('copy').onclick = () => {
    navigator.clipboard.writeText(document.getElementById('password').innerText)
}
function getWords() {
    var wordList = require('word-list-json');
    console.log(wordList)
}