let counter = '0'
const couterDisplay = document.querySelector('h3')
const speeds = document.querySelectorAll('button')

const bubbleMaker = () => {
    const bubble = document.createElement('span')
    const size = Math.round(Math.random() * 200 + 100) + 'px'
    const x = Math.random() * 100 + '%'
    const y = Math.random() * 100 + 50 + '%'
    const plusMinus = Math.random() > 0.5 ?  1 : -1

    bubble.classList.add('bubble')
    document.body.appendChild(bubble)

    bubble.style.height = size
    bubble.style.width = size
    bubble.style.left = x
    bubble.style.top = y
    bubble.style.setProperty('--left', Math.random() * 100 * plusMinus + '%')

    bubble.addEventListener('click', () => {
        counter ++
        couterDisplay.textContent = counter
        bubble.remove()
    })

    setTimeout(() => {
        bubble.remove()
    }, 10000)
}
setInterval(bubbleMaker, 1000)
