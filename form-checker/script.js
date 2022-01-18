const inputs = document.querySelectorAll('input[type = "text"], input[type = "password"]')
const progressBar = document.getElementById('progress-bar')
const form = document.querySelector('form')
let pseudo, email, password, confirmPass

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector(`.${tag}-container`)
    const span = document.querySelector(`.${tag}-container > span`)
    if(!valid) {
        container.classList.add('error')
        span.textContent = message
    } else {
        container.classList.remove('error')
        span.textContent = message
    }
}

const pseudoChecker = (value) => {
    if(value.length > 0 && value.length < 3 || value.length > 20) {
        errorDisplay('pseudo', 'Le pseudo doit être compris entre 3 et 20 caractères', false)
        pseudo = null
    } else if(!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay('pseudo', 'Le pseudo ne doit pas contenir de caractères spéciaux', false)
        pseudo = null
    } else {
        errorDisplay('pseudo', '', true)
        pseudo = value
    }
}

const emailChecker = (value) => {
    if(!value
        .match(
            /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i
        )
    ) {
        errorDisplay('email', 'L\'email n\'est pas valide', false)
        email = null
    } else {
        errorDisplay('email', '', true)
        email = value
    }
}
const passwordChecker = (value) => {
    progressBar.classList.remove('progressRed', 'progressBlue', 'progressGreen' )
    if (!value
        .match(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        )
    ) {
        errorDisplay('password', 'Minimum 8 caractères + majuscule + chiffre + caractère spécial ', false)
        progressBar.classList.add('progressRed')
        password = null
    } else if(value.length < 12) {
        progressBar.classList.add('progressBlue')
        errorDisplay('password', '', true)
        password = value
    } else {
        progressBar.classList.add('progressGreen')
        errorDisplay('password', '', true)
        password = value
    }
    if(confirmPass) confirmChecker((confirmPass))
}
const confirmChecker = (value) => {
    if(value !== password) {
        errorDisplay('confirm', 'Les mots de passe ne sont pas identiques', false)
        confirmPass = false
    } else {
        errorDisplay('confirm', '', true)
        confirmPass = true
    }
}

inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        switch(e.target.id) {
            case 'pseudo':
                pseudoChecker(e.target.value)
                break
            case 'email':
                emailChecker(e.target.value)
                break
            case 'password':
                passwordChecker(e.target.value)
                break
            case 'confirm':
                confirmChecker(e.target.value)
                break
            default:
                console.log('null')
        }
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(pseudo && email && password && confirmPass) {
        const data = {
            pseudo,
            email,
            password
        }
        inputs.forEach((input) => input.value = '')
        pseudo = null
        email = null
        password = null
        confirmPass = null
        progressBar.classList.remove('progressBlue', 'progressGreen')
        alert('Le formulaire a été bien envoyé :)')
        console.log(data)
    } else {
        alert('Veuillez remplir tous les champs ;)')
    }
})
