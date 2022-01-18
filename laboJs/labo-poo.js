const obj = {
    pseudo: 'Esteban',
    age: 24,
    admin: false,

    direBonjour: function() {
        console.log(`Coucou je suis ${this.pseudo}`)
    }
}
const obj2 = {
    taille: '1m80',
    poids: '75 kg'
}

//--- ADD OR MODIF
obj.ville = 'Bagnols'
obj['admin'] = true

//--- DELETE
delete obj.ville

//--- CHECK VALUE
// console.log('pseudo' in obj)

//--- PARCOURIR
for(const key in obj) {
    // console.log(`${key}: ${obj[key]}`)
}

//--- NATIV METHODS
const keys = Object.keys(obj)
const values = Object.values(obj)
const nestedArray = Object.entries(obj)
const fusionObjects = Object.assign({}, obj, obj2)
const objNoModif = Object.freeze(obj)
const objModifNoEntry = Object.seal(obj)

//--- CONSTRUCTOR
function User(pseudo, password) {
    this.pseudo = pseudo
    this.password = password

    this.getPassword = function() {
        // console.log(`Le password de ${this.pseudo} est ${this.password}`)
    }
}

const user1 = new User('Stella', 'pass1')
user1.getPassword()

// --- FACTORY FUNCTIONS
const UserFactory = function(pseudo, password) {
    return{
        pseudo,   // pseudo: pseudo
        password
    }
}
const user2 = UserFactory('Esteban', 'pass2')

//--- CLASS

class Post {
    constructor(title, content) {
        this.title = title
        this.content = content
    }
    displayPost = function() {
        document.body.innerHTML =
            `
                <h2>${this.title}</h2>
                <p>${this.content}</p>
            `
    }
}

//--- PROTOTYPE
Post.prototype.logTitle = function() {
    console.log(this.title)
}

//--- ANY PROTOTYPES
Object.assign(Post.prototype, {
    method1() {
        // ma methode
    },
    method2() {
        // ma méthode
    },
})

const post1 = new Post('Codding javascript', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, facere!')
// post1.displayPost()
// post1.logTitle()
// console.log(post1)

//--- HERITAGE
class Animal {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    saySomething(text) {
        console.log(`${this.name} dit ${text}`)
    }
}

class Dog extends Animal {
    run() {
        console.log(this.name + ' cout vite !')
    }
}

const rintintin = new Dog('Rintintin', 9)
console.log(rintintin)