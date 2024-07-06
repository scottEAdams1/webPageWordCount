import { JSDOM } from 'jsdom'

async function createTrie(url) {
    const words = await fetchWords(url)
    const words_array = filterWords(words)
    let trie = {}
    for (let word of words_array) {
        add(trie, word)
    }
    return trie

}

//Filters the words by removing unusable data
function filterWords(words) {
    //Split words into lines
    let blocks = words.split('\n')
    let words_array = []
    //For each line
    for (let block of blocks) {
        //Remove extra characters e.g. ? \n \t
        block = block.replace(/[^a-zA-z0-9\s]/g,'')
        //Splits lines into individual words
        let words = block.split(' ')
        //Adds words to the final array
        for (let word of words) {
           words_array.push(word)
        }
    }
    return words_array
}

//Adds words to the trie
function add(trie, word) {
    let current = trie
    //Gets each character from the word
    for (let character of word) {
        //If the character isn't already there, add it
        if (!current[character]) {
            current[character] = {}
        }
        //Go into that character
        current = current[character]
    }
    //Add an end symbol (*), and increment its count
    const end = '*'
    if (!current[end]) {
        current[end] = 0
    }
    current[end]++
}

//Gets the words from the webpage
async function fetchWords(url) {
    let response
    try {
        response = await fetch(url)
    } catch(err) {
        throw new Error(err.message)
    }
    //Gets html from webpage
    let html
    const contentType = response.headers.get('content-type')
    if (contentType.includes('text/html') === true) {
        html =  await response.text()
    }
    //Gets words from html
    const words = htmlToWords(html)
    return words
}

//Gets words from the html
function htmlToWords(html) {
    const doc = new JSDOM(html)
    let docu = doc.window.document
    //Removes scripts
    for (let i = 0; i < docu.scripts.length; i++) {
        docu.scripts[i].text = '\0'
    }
    //Gets text
    let children = docu.querySelectorAll('*')
    return children[0].textContent.toString().replace(/ +/g, ' ').replace(/\\n+/g, ' ')
}

export { createTrie }