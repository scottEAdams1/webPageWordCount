import { JSDOM } from 'jsdom'

async function createTrie(url) {
    const words = fetchWords(url)
    return words

}

async function fetchWords(url) {
    let response
    try {
        response = await fetch(url)
    } catch(err) {
        throw new Error(err.message)
    }
    const html =  await response.text()
    const words = htmlToWords(html)
    return words
}

function htmlToWords(html) {
    const doc = new JSDOM(html)
    const span = doc.window.document.createElement('span')
    span.innerHTML = html
    const children = doc.window.document.querySelectorAll('*')
    for (let i = 0; i < children.length; i++) {
        if (children[i].textContent) {
            children[i].textContent += ' '
        } else {
            children[i].innerText += ' '
        }
    }
    return [span.textContent || span.innerText].toString().replace(/ +/g, ' ')
}

export { createTrie }