

//? Yana bir g'oya Day Calculator bu kun minut sekundlarni hissoblaydi


const check = document.querySelector('.check'),
consWeek = document.querySelector('#week'),
consMonth = document.querySelector('#month'),
age = document.querySelector('#age'),
next = document.querySelector('.next_birthday'),
yourAge = document.querySelector('.age'),
famous = document.querySelector('.section'),
inputD = document.querySelector('.date')



// * Calculate birth day button click

var calculateBirthday = ()=>{
    

    getCurrentDate()
    getBirthDate()

    
    calcAge()
    summary()

    section()

}

// * Get birthday from User

const getBirthDate = ()=>{
    let inDate = inputD.value
    if(inDate==null || inDate==''){
        yourAge.textContent = "Choose a date please!";  
        return false; 
      }
    date = new Date(inDate)
    let birthDate = {}
    //   console.log(birthDate)
    birthDate.year = date.getYear()
    birthDate.mon = date.getMonth() + 1
    birthDate.day = date.getDate()
    birthDate.full = date
    return birthDate
}

// * Get current date from system

function getCurrentDate() {
    let d = new Date(),
        cY = d.getYear(),
        cD = d.getDate(),
        cM = d.getMonth() + 1
        const D = { year: cY, date: cD, month: cM }
    return D
}

// * Calculate User Age

const calcAge = ()=>{
    let birthday = getBirthDate()
    let current = getCurrentDate()
    
    //  Calculate Age
    var ageUser = current.year - birthday.year
    
    // Calculate Month
    if (current.month >= birthday.mon) {
        var ageMonth = current.month - birthday.mon
    }
    else {
        ageUser-- 
        var ageMonth = 12 + current.month - birthday.mon
    }
    
    //  Calculate Day
    
    if (current.date >= birthday.day) {
        var ageDay = current.date - birthday.day
    }
    
    else{
        if (ageMonth == 0) {
            ageMonth = 12;
            ageUser--;
        }
        if(birthday.mon == 1 || birthday.mon == 3 || birthday.mon == 5 || birthday.mon == 7 || birthday.mon == 8 || birthday.mon == 10 || birthday.mon == 12) {
            ageMonth--
            var ageDay = 31 - birthday.day + current.date
        }
        if(birthday.mon == 2) {
            ageMonth--
            var ageDay = 28 - birthday.day + current.date     
            ageDay = ageDay >= 28 ? ageDay - 28 && ageMonth++ : ageDay = ageDay

        }
        if(birthday.mon == 4 || birthday.mon == 6 || birthday.mon == 9 || birthday.mon == 11) {
            ageMonth--
            var ageDay = 30 - birthday.day + current.date
            ageDay = ageDay >= 30 ? ageDay - 30 && ageMonth++ : ageDay = ageDay
        }
    }
    yourAge.textContent = ''
    yourAge.textContent = yourAge.textContent + ageUser + " Year " + ageMonth + ' Month ' + ageDay + ' Day'
    
    // * Calculate Next Birthday
    if (current.month == birthday.mon && current.date == birthday.day) {     // Buni boshqacha yozish mumkin 
        // next.textContent = 12 + ' Month ' + 0 + ' Day '
        ageMonth = 12 
        nextBirthday = 0
        
    }
    else{
        if(current.month == 1 || current.month == 3 || current.month == 5 || current.month == 7 || current.month == 8 || current.month == 10 || current.month == 12) {
            ageMonth = 11 - ageMonth 
            var nextBirthday = 31 - ageDay
            
            if (nextBirthday == 31) {
                ageMonth++
                nextBirthday = 0
            }else{nextBirthday = nextBirthday}
        }
        if(current.month == 2) {
            ageMonth = 11 - ageMonth 
        var nextBirthday = 28 - ageDay
        
            if (nextBirthday == 28) {
                ageMonth++
                nextBirthday = 0
            }else{nextBirthday = nextBirthday}
        }
        if(current.month == 4 || current.month == 6 ||current.month == 9 || current.month == 11) {
            ageMonth = 11 - ageMonth 
        var nextBirthday = 30 - ageDay
        if (nextBirthday == 30) {
            ageMonth++
            nextBirthday = 0
        }else{nextBirthday = nextBirthday}
        }
    }

    next.textContent = ''
    next.textContent = ageMonth + ' Month ' + nextBirthday + ' Day '
}
// * Calculate Summary Month, Week, Day, Hour, Minut

const summary = ()=>{
    let birthday = getBirthDate().full
    let current = new Date()
    
    //calculate the difference of dates
    let totalMillisecond = current.valueOf() - birthday.valueOf();
    
    let totalYear = Math.floor(totalMillisecond / 31557600000)
    let totalMonths = Math.floor(totalMillisecond / 2629746000)
    let totalWeeks = Math.floor(totalMillisecond / 604800000)
    let totalDays = Math.floor(totalMillisecond / 86400000)
    let totalHours = Math.floor(totalDays * 24)                 //! 100% chiqarish uchun totalmilisecundni 3600000 ga bo'lish kerak
    let totalMinutes = Math.floor(totalHours * 60) 
    
    age.textContent = totalYear
    consMonth.textContent = totalMonths
    consWeek.textContent = totalWeeks
    document.getElementById('day').textContent = totalDays
    document.getElementById('hour').textContent = totalHours
    document.getElementById('minute').textContent = totalMinutes
    
}

// ?===================================================  Famous Section  =========================================================



function section () {
    let inp = new Date(inputD.value).getMonth()+1
    famous.innerHTML = ''

    fetch ('data.json') 
    
        .then (json => json.json())
        .then (arra => generateFamous(arra, inp))
}

function generateFamous (data, mon) {
    
    const filteredData = data.filter(item => item.mon == mon) 
    

    
    filteredData.forEach(e => {
        console.log(e.name)
        const card = `
            <div class="card MyCard">
                <img src="${e.img == null ? emptyImageURL : e.img}" class="card-img-top" alt="no found">
                <div class="card-body">
                <h5 class="card-title">${e.name}</h5>
                <span class="span"> ${e.date} </span>
                    <p class="card-text">${e.desc}</p>
                </div>
            </div>
            `
        famous.innerHTML += card
    });
    
}

function filterByMoth(value){
    console.log(value)
    let inp = value
    famous.innerHTML = ''

    fetch ('data.json') 
    
        .then (json => json.json())
        .then (arra => generateFamous(arra, inp))
}
//?=============================  Day and Dark mode section  ===============================================



// Get the root element
// var r = document.styleSheets[1].cssRules[1].style[4]
// console.log(r)

let tgl = true

const theme = () => {
    let dark = document.querySelector('.day')
    dark.classList.toggle('dark')
    tgl = !tgl
    console.log(tgl)
    if(tgl === false) {
        document.documentElement.style.setProperty("--primary-dark", "#5526ad");
        document.documentElement.style.setProperty("--primary", "#342c79");
        document.documentElement.style.setProperty("--primary-light", "#2b4567");
        document.documentElement.style.setProperty("--greyLight-1", "#14171e");
        document.documentElement.style.setProperty("--greyDark", "#3e4c6e");
        document.documentElement.style.setProperty("--greyLight-2", "#222");
        document.documentElement.style.setProperty("--white", "#444");
    }
    else {
        document.documentElement.style.setProperty("--primary-dark", "#5b0eeb");
        document.documentElement.style.setProperty("--primary", "#6d5dfc");
        document.documentElement.style.setProperty("--primary-light", "#8abdff");
        document.documentElement.style.setProperty("--greyLight-1", "#E4EBF5");
        document.documentElement.style.setProperty("--greyDark", "#9baacf");
        document.documentElement.style.setProperty("--greyLight-2", "#c8d0e7");
        document.documentElement.style.setProperty("--white", "#fff");
    }
}

