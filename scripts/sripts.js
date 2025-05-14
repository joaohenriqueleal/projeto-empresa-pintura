"use strict"

const mail = document.querySelector('#mail')
const wtzp = document.querySelector('#wtzp')

const myObserver = new IntersectionObserver((entryes) => {
    entryes.map((entrye) => {
        if (entrye.isIntersecting) {
            entrye.target.classList.add('show')
        } else {
            entrye.target.classList.remove('show')
        }
    })
})

const hiddens = [...document.querySelectorAll('.hidden')]

hiddens.map((element) => myObserver.observe(element) )

mail.addEventListener('click', (event) => {
    const texto = 'loa1000@bol.com.br'
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("e-mail copiado para a área de transferẽncia!")
        })
        .catch(err => {
            console.error("Erro ao copiar: ", err);
        })
})

wtzp.addEventListener('click', (event) => {
    const texto = '63984749978'
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Número whatzzap copiado para a área de transferẽncia!")
        })
        .catch(err => {
            console.error("Erro ao copiar: ", err)
        })
})
