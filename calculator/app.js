const buttons = document.querySelectorAll('.btn')
const result = document.getElementById('result')
const equal = document.querySelector('#equal')
const clear = document.querySelector('#clear')

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        result.textContent += e.target.id
    })
})

equal.addEventListener('click', () => {
    result.textContent = eval(result.textContent)
})

clear.addEventListener('click', () => {
    result.textContent = ''
})