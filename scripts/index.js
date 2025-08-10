"use strict"


import windowViewText from "./windowViewTextModal.js"

const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const hiddens = [...document.querySelectorAll('.hidden')]
hiddens.forEach((element) => myObserver.observe(element))

const phase = document.getElementById('phase')

const phases = [
    'Pintura de caixas...',
    'Fidelidade ao cliente...',
    'Identificação com anilhas...',
    'Facilidade de manutenção...',
    'Só aqui na JH & D!'
]

let phasesIndex = 0
let charIndex = 0
let typingInterval

function typePhase() {
    const currentPhase = phases[phasesIndex]
    phase.innerHTML = currentPhase.substring(0, charIndex + 1) + '<span class="cursor">|</span>'
    charIndex++

    if (charIndex === currentPhase.length) {
        clearInterval(typingInterval)
        setTimeout(() => {
            phasesIndex = (phasesIndex + 1) % phases.length
            charIndex = 0
            typingInterval = setInterval(typePhase, 50)
        }, 1500)
    }
}

typingInterval = setInterval(typePhase, 100)

const cards = [...document.getElementsByClassName('card')]

for (let card of cards) {
    const p = card.querySelector('p')
    if (!p) continue

    if (p.textContent.length > 250) {
        card.dataset.original = p.textContent
        const truncatedText = p.textContent.slice(0, 250)
        p.innerHTML = `${truncatedText}<span><strong> (Ler mais...)</strong></span>`

        card.addEventListener('click', () => {
            const h2 = card.querySelector('h2')
            const titleText = h2 ? h2.textContent : 'Título não encontrado'
            const originalContent = card.dataset.original || 'Conteúdo não encontrado'
            const config = {
                title: titleText,
                content: originalContent
            }
            windowViewText.createWindow(config)
        })

    } else {
        card.addEventListener('click', () => {
            const h2 = card.querySelector('h2')
            const titleText = h2 ? h2.textContent : 'Título não encontrado'
            const pContent = p.textContent || 'Conteúdo não encontrado'
            const config = {
                title: titleText,
                content: pContent
            }
            windowViewText.createWindow(config)
        })
    }
}

const inputQtdBoxWasher = document.getElementById('qtdBoxWasher')
const inputQtdBoxNoWasher = document.getElementById('qtdBoxNoWasher')
const inputQtdBoxWater = document.getElementById('qtdBoxWater')

const buttonCompute = document.getElementById('buttonCompute')
const pResult = [...document.getElementsByClassName('pResult')][0]


function computePrice() {
    let total = 0
    if (parseInt(inputQtdBoxWasher.value)) {
        total += inputQtdBoxWasher.value * 35
    }
    if (parseInt(inputQtdBoxNoWasher.value)) {
        total += inputQtdBoxNoWasher.value * 30
    }
    if (parseInt(inputQtdBoxWater.value)) {
        total += inputQtdBoxWater.value * 10
    }
    return total
}

function formatPrice(value) {
    let num = parseFloat(value);
    if (isNaN(num)) return "R$ 0,00";

    return "R$ " + num
        .toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function showTotal(total) {
    pResult.style.display = 'flex'
    pResult.innerHTML = formatPrice(total)
}

buttonCompute.addEventListener('click', () => {
    showTotal(computePrice())
})

const aWhatsapp = document.getElementById('whatsapp')
const phoneNumber = '5563984749978'

aWhatsapp.addEventListener('click', () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank')
})
