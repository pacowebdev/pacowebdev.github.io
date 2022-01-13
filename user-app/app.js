const url = 'https://randomuser.me/api/?results=24'
const cards = document.getElementById('cards-container')

let userData = []

const fetchUsers = async () => {
    await fetch(url)
        .then((res) => res.json())
        .then((data) => userData = data.results)
        .catch((err) => console.log(err))
}

const dateParser = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}

const dayCalc = (date) => {
    let today = new Date
    let todayTimestamp = Date.parse(today)
    let timestamp = Date.parse(date)

    return Math.ceil((todayTimestamp - timestamp) / 8.64e7)
}

const userDisplay = async () => {
    await fetchUsers().then(r => console.log('fetched'))
        document.body.innerHTML = userData.map((user) =>
            `
                <div class="card">
                    <img src="${user.picture.large}" alt="Photo de ${user.name.last}">
                    <h3>${user.name.first} ${user.name.last}</h3>
                    <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
                    <em>Membre depuis ${dayCalc(user.registered.date)} jours</em>
                    <em>(${user.registered.age} ans)</em>
                </div>
            `
        ).join('')
}
userDisplay().then(r => console.log('display'))