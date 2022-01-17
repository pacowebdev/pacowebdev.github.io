const h1El = document.querySelector('h1');
const mainEl = document.querySelector('main');
const btnEl = document.querySelector('.btn-container');

const basicArray = [
    { pic: 1, min: 1 },
    { pic: 2, min: 1 },
    { pic: 3, min: 1 },
    { pic: 4, min: 1 },
    { pic: 5, min: 1 },
    { pic: 6, min: 1 },
    { pic: 7, min: 1 },
    { pic: 8, min: 1 },
    { pic: 9, min: 1 }
];
let exerciceArray = [];

// get local storage exercices array
(() => {
    if (localStorage.exercices) {
        exerciceArray = JSON.parse(localStorage.exercices);
    } else {
        exerciceArray = basicArray;
    }
}) ();

class Exercice {
    constructor() {
        this.index = 0;
        this.minutes = exerciceArray[this.index].min;
        this.secondes = 0;
    }
    updateCountdown() {
        this.secondes = this.secondes < 10 ? '0' + this.secondes : this.secondes;

        setTimeout(() => {
            if (this.minutes === 0 && this.secondes ===  "00") {
                this.index++;
                if (this.index < exerciceArray.length) {
                    this.minutes = exerciceArray[this.index].min;
                    this.secondes = 0;
                    this.updateCountdown();
                } else {
                    return page.finish();
                }
            } else if (this.secondes ===  '00') {
                this.minutes--;
                this.secondes = 59;
                this.updateCountdown();
            } else {
                this.secondes--;
                this.updateCountdown();
            }
        }, 100);

        return (
            mainEl.innerHTML =
            `
                <div class="exercice-container">
                    <p>${this.minutes}: ${this.secondes}</p>
                    <img src="./img/${exerciceArray[this.index].pic}.png" alt="Photo exercice ${this.index + 1}">
                    <div>${this.index + 1} / ${exerciceArray.length}</div>
                </div>
            `
        )
    };
}

const utils = {
    pageContent: function(title, content, btn) {
        h1El.innerHTML = title;
        mainEl.innerHTML = content;
        btnEl.innerHTML = btn;
    },

    handleEventMinute: function() {
        document.querySelectorAll('input[type="number"]').forEach((input) => {
            input.addEventListener('input', (e) => {
                exerciceArray.map((exo) => {
                    if(exo.pic == e.target.id) {
                        exo.min = parseInt(e.target.value);
                        this.store();
                    }
                })
            })
        })
    },

    handleEventArrow: function() {
        document.querySelectorAll('.arrow').forEach((arrow) => {
            arrow.addEventListener('click', (e) => {
                let position = 0;
                exerciceArray.map((exo) => {
                    if (exo.pic == e.target.dataset.pic && position !== 0) {
                        [exerciceArray[position], exerciceArray[position -1]] = [exerciceArray[position - 1], exerciceArray[position]];
                        page.lobby();
                        this.store();
                    } else {
                        position++
                    }
                })
            })
        })
    },

    deleteItem: function() {
        document.querySelectorAll('.deleteBtn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                let newArray = [];
                exerciceArray.map((exo) => {
                    if (exo.pic != e.target.dataset.pic) {
                        newArray.push(exo);
                    }
                })
                exerciceArray = newArray;
                page.lobby();
                this.store();
            })
        })
    },

    reboot: function() {
        exerciceArray = basicArray;
        page.lobby();
        this.store();
    },

    store: function() {
        localStorage.exercices = JSON.stringify(exerciceArray);
    }
};
const page = {

    lobby: function() {
        let mapArray = exerciceArray.map((exo) => {
             return `
                <li>
                    <div class="card-header">
                        <input type="number" id=${exo.pic} min="1" max="10" value=${exo.min}>
                        <span>mn</span>
                    </div>
                    <img src="./img/${exo.pic}.png" alt="Exo ${exo.pic}">
                    <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
                    <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic}></i>
                </li>
            `
        }).join('');

        utils.pageContent(
            "Paramètres <i id='reboot' class='fas fa-undo'></i>",
            `<ul>${mapArray}</ul>`,
            "<button id='start'>Commencer <i class='far fa-play-circle'></i></button>"
        );
        const reboot = document.getElementById('reboot');
        const start = document.getElementById('start');
        reboot.addEventListener('click', () => utils.reboot());
        start.addEventListener('click', () => {
            this.routine();
        })


        utils.handleEventMinute();
        utils.handleEventArrow();
        utils.deleteItem();
    },

    routine: function() {
        const exercice = new Exercice();
        utils.pageContent(
            "Routine",
            exercice.updateCountdown(),
            null
        );
    },

    finish: function() {
        utils.pageContent(
            "C'est terminé :)",
            "<button id='start'>Recommencer</button>",
            "<button id='reboot' class='btn-reboot'>Réinitialiser<i class='fas fa-times-circle'></i></button>"
        )
    }
};

page.lobby()
