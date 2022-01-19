const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const rangeLine = document.getElementById('range-line')
const spanPixel = document.getElementById('px')
const colorsContainer = document.querySelector('.colors-container')
const reset = document.getElementById('reset')
const colors = document.querySelectorAll('.colors-container > input')
let lineWidth = 1
let lineColor = 'white'

colors.forEach((color) => {
    color.addEventListener('click', (e) => {
        lineColor = e.target.value
    })
})

rangeLine.addEventListener('input', (e) => {
    spanPixel.innerText = e.target.value + ' px'
    lineWidth = e.target.value
})

const getMousePos = (e) => {
    const rect = canvas.getBoundingClientRect()
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

const mouseMove = (e) => {
    const mousePos = getMousePos(e)
    ctx.lineTo(mousePos.x, mousePos.y)
    ctx.stroke()
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
}

const draw = () => {
    canvas.addEventListener('mousedown', (e) => {
        e.preventDefault()
        const mousePos = getMousePos(e)

        ctx.beginPath()
        ctx.moveTo(mousePos.x, mousePos.y)

        canvas.addEventListener('mousemove', mouseMove)
        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', mouseMove)
        })
    })
}
draw()

reset.addEventListener('click', () => {
    ctx.clearRect(0, 0, 600, 400)
})