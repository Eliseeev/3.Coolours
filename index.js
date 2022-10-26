const cols = document.querySelectorAll('.col')
// Смена цвета при нажатии на пробел
document.addEventListener('keydown', event => 
 
{   
    event.preventDefault()
    if (event.code.toLowerCase() === 'space'){
        setRandomColors()
    }

})


document.addEventListener('click', (event) => {
   // В переменную добавляется по чему был сделан клик
   // В dataset хранится объект всех атрибутов
   // Кликаем в бразуере на замок - получаем DOMStringMap {type:lock}
   // Если клик в другом месте осуществляется, то выводится в консоли DOMStringMap {}
   const type = event.target.dataset.type
   
   // Будем получать всегда иконку
   if(type === 'lock'){
      const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]
      // Получаем первый элемент (ребёнка) внутри этой кнопки 
      // children - массив всех детей-элементов, которые у нас есть

      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
   } 
   // Копирование цвета #...... и вывод в консоль 
   else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
   }
})

// Копирование цвета
const copyToClickboard = (text) => {
    return navigator.clipboard.writeText(text)
}
// RGB
// #FF0000
// #00FF00
// #0000FF

const gerenerateRandomColor = () => {
    let color = ''
    const hexCodes = '0123456789ABCDEF'
    for(let i = 0; i < 6; i++){
       color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}


const setRandomColors = (isInitial) => {
    // Если загрузка первоначальная, то из getColorsFromHash() забираем цвета, а иначе []
    const colors = isInitial ? getColorsFromHash() : []
    
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
    
        // Блокировка цвета. Замок закрыт
        if(isLocked){
            colors.push(text.textContent)
            return 
        }
        
        // Применяется двойной тернарный оператор
        // Если colors[index] существует...Иначе рандомно генерируем
        const color = isInitial 
        ? colors[index] 
            ? colors[index]
            : gerenerateRandomColor()
        : gerenerateRandomColor()
        
        if (!isInitial){
            colors.push(color)
        }
       
        text.textContent = color
        col.style.backgroundColor = color

        setTextColor(text, color)
        setTextColor(button, color)
    })

        updateColorsHash(colors)
    }

const setTextColor = (text, color) => {
    // chroma - library of colors
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

const updateColorsHash = (colors = []) => {
   document.location.hash = colors.map(col => {return col.toString().substring(1)}).join('-')
}


// Если цвета есть, то произойдёт генерация из URL - адреса
// Возвращаем массив цветов в консоли
const getColorsFromHash = () => {
    if (document.location.hash.length > 1) {
       return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }

    return []
}

// isInitial будет true только в том случае, когда мы будем загружать страницу
setRandomColors(true)




