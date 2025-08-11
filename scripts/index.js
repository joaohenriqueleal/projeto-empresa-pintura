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

// Texto animado
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

// Cards com truncamento automático
const cards = [...document.getElementsByClassName('card')]
for (let card of cards) {
    const p = card.querySelector('p')
    if (!p) continue

    const originalText = p.textContent.trim()
    card.dataset.original = originalText

    if (p.offsetHeight > 250) {
        let text = originalText
        p.textContent = text
        // reduz até caber
        while (p.offsetHeight > 250 && text.length > 0) {
            text = text.trim().slice(0, -5) // tira 5 chars de cada vez
            p.textContent = text + "..."
        }
        // adiciona "ler mais"
        p.innerHTML += `<span style="color:blue;cursor:pointer"><strong> Ler mais</strong></span>`

        card.addEventListener('click', () => {
            const h2 = card.querySelector('h2')
            const titleText = h2 ? h2.textContent : 'Título não encontrado'
            windowViewText.createWindow({
                title: titleText,
                content: card.dataset.original
            })
        })
    } else {
        card.addEventListener('click', () => {
            const h2 = card.querySelector('h2')
            const titleText = h2 ? h2.textContent : 'Título não encontrado'
            windowViewText.createWindow({
                title: titleText,
                content: p.textContent
            })
        })
    }
}

// Calculadora
const inputQtdBoxWasher = document.getElementById('qtdBoxWasher')
const inputQtdBoxNoWasher = document.getElementById('qtdBoxNoWasher')
const inputQtdBoxWater = document.getElementById('qtdBoxWater')

const buttonCompute = document.getElementById('buttonCompute')
const pResult = [...document.getElementsByClassName('pResult')][0]

function computePrice() {
    let total = 0
    if (parseInt(inputQtdBoxWasher.value)) total += inputQtdBoxWasher.value * 35
    if (parseInt(inputQtdBoxNoWasher.value)) total += inputQtdBoxNoWasher.value * 30
    if (parseInt(inputQtdBoxWater.value)) total += inputQtdBoxWater.value * 10
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

// WhatsApp
const aWhatsapp = document.getElementById('whatsapp')
const phoneNumber = '5563984749978'
aWhatsapp.addEventListener('click', () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank')
})
