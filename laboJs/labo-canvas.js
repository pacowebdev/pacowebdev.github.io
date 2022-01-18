const reset = document.querySelector('.reset')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

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
    ctx.strokeStyle = 'salmon'
    ctx.lineWidth = 2

}

canvas.addEventListener('mousedown' , (e) => {
    e.preventDefault() // prevent drag and drop
    const mousePos = getMousePos(e)

    ctx.beginPath() // initialise path
    ctx.moveTo(mousePos.x, mousePos.y) // start

    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('mouseup', () => {
        canvas.removeEventListener('mousemove', mouseMove)
    })
})

reset.addEventListener('click', () => {
    ctx.clearRect(0, 0, 600, 400)
})