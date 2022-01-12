const generateButton = document.getElementById('generate-button')

const lowercase = document.getElementById('lowercase')
const uppercase = document.getElementById('uppercase')
const numbers = document.getElementById('numbers')
const symbols = document.getElementById('symbols')
const rangeValue = document.getElementById('display-password-length')
const passwordOutput = document.getElementById('password-output')
let password = ''

const dataLowercase = 'azertyuiopqsdfghjklmwxcvbn'
const dataUppercase = dataLowercase.toUpperCase()
const dataNumbers = '1234567890'
const dataSymbols = `@&é"'(§è!çà)-^$ù£,;:=?./+`


const generatePassword = () => {
    let data = []
    password = ''
    if(lowercase.checked) data.push(...dataLowercase)
    if(uppercase.checked) data.push(...dataUppercase)
    if(numbers.checked) data.push(...dataNumbers)
    if(symbols.checked) data.push(...dataSymbols)

    if(data.length === 0) {
        alert('Veuillez sélectionner au moins un critère ;)')
        return
    }

    for (let i = 0; i<rangeValue.value; i++) {
        password += data[Math.floor(Math.random() * data.length)]
        passwordOutput.value = password
    }

    passwordOutput.select()

}

generateButton.addEventListener('click', () => {
    generatePassword()
})
