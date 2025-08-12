"use strict"


class windowViewText {

    static createWindow = (config) => {
        const overlayStyle = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;

            display: flex;
            align-items: center;
            justify-content: center;
        `
        const overlay = document.createElement('div')
        overlay.setAttribute('style', overlayStyle)

        const MainWindowStyle = `
            box-shadow: 
                -5px -5px 5px rgba(0, 0, 0, 0.189),
                5px -5px 5px rgba(0, 0, 0, 0.189),
                -5px  5px 5px rgba(0, 0, 0, 0.189),
                5px  5px 5px rgba(0, 0, 0, 0.189);
            background-color: white;
            border-radius: 8px;

            width: 80%;
            height: 550px;

            display: flex;
            flex-direction: column;

            animation: entry .4s ease-in-out;
        `
        const MainWindow = document.createElement('div')
        MainWindow.setAttribute('style', MainWindowStyle)
        MainWindow.setAttribute('class', 'window')

        const WindowHeadStyles = `
            background-color: rgb(238, 238, 238);
            border-radius: 8px;

            padding: 8px;
            padding-right: 16px;
            width: 100%;

            color:rgb(67, 67, 67);

            display: flex;
            align-items: center;
            justify-content: space-between;
        `
        const WindowHead = document.createElement('div')
        WindowHead.setAttribute('style', WindowHeadStyles)
        const h2 = document.createElement('h2')
        h2.innerHTML = config.title
        h2.style.margin = '0 auto'
        WindowHead.appendChild(h2)

        const iCloseStyle = `
            padding: 6px;
        `
        const iClose = document.createElement('i')
        iClose.setAttribute('class', 'bi bi-x-lg close')
        iClose.setAttribute('style', iCloseStyle)
        iClose.addEventListener('click', () => {
            overlay.remove()
        })
        WindowHead.appendChild(iClose)

        const WindowBodyStyle = `
            padding: 24px;
            width: 100%;
            height: 100%;

            font-size: 1.5em;
            text-indent: 16px;
        `
        const WindowBody = document.createElement('div')
        WindowBody.setAttribute('style', WindowBodyStyle)
        WindowBody.innerHTML = config.content

        document.body.prepend(overlay)
        overlay.appendChild(MainWindow)
        MainWindow.appendChild(WindowHead)
        MainWindow.appendChild(WindowBody)
    }

}


export default windowViewText
