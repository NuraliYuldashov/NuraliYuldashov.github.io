
function start(level = 3){
    let cardsNumber = level 
    const card = createCards(cardsNumber)
    
    let newBoxes = getCorrect(card)
    
    document.querySelector("#root").innerHTML = ''
    newBoxes.forEach(e => {
        let b = `<div class="box" onclick="getChoose(this)" style="background-color: rgb(${e.color});" data-correct="${e.isTrue}"></div>`
        document.querySelector("#root").innerHTML += b
        });
}
    
    function getRGB() {
        let red = Math.round(Math.random() * 255)
        let green = Math.round(Math.random() * 255)
        let blue = Math.round(Math.random() * 255)
        let rgb = `${red},${green},${blue}`
        return rgb
    }
    function Card(color, isTrue=false) {
        this.color = color
        this.isTrue = isTrue
    }
    function createCards(n) {
        const cards = []
        for(let i = 0; i < n; i++) {
            cards.push(new Card(getRGB() ))
        }
        return cards
    }

    function getCorrect (arr) {
        let random = Math.floor(Math.random() * arr.length)
        arr[random].isTrue = true
        let outHeader =    `
        <div class="rgbcode">(${arr[random].color})</div>
        `
        document.querySelector('.rgb').innerHTML = `
                                                        <div class="r">R</div>
                                                        <div class="g">G</div>
                                                        <div class="b">B</div>
                                                    `
        document.querySelector('.rgb').innerHTML += outHeader
        return arr
    }

function getChoose(element) {
    let life = eval(document.querySelector('.life').textContent)
    let score = eval(document.querySelector('.score').textContent)
    let e = element.getAttribute("data-correct")
    let s
    let l
    if (e == 'false'){
        element.style.visibility = 'hidden'
        l = +life - 1
        document.querySelector('.life').textContent = l
        if (l == 0){
            document.querySelector('.over')
            .style.display = 'flex'
        }
    } else {
        s = +score + 1
        let level = s < 6 ? 3 : s < 9 ? 6 : 9
        document.querySelector('.score').textContent = s
        document.querySelector('#score').textContent = s
        document.querySelectorAll(".box").forEach(e => {
            e.style.backgroundColor = element.style.backgroundColor
            e.style.visibility = 'visible'
        })
        setTimeout(()=>{start(level)}, 2000)
    }

}
function restart() {
    document.querySelector('.life').textContent = 8
    document.querySelector('.score').textContent = 0
    document.querySelector('.over').style.display = 'none'
    start()
}


