import { createTrie } from "./trie.js"
import { createReport } from "./report.js"

async function main() {
    //Checks for the number of arguments
    if (process.argv.length < 3) {
        throw new Error("Error: Does not include URL")
    } else if (process.argv.length > 3) {
        throw new Error("Error: Too many arguments")
    } else {
        //Gets url
        const url = process.argv[2]
        //Creates trie based on the words of the webpage at the url
        const trie = await createTrie(url)
        //Creates report based on trie
        const report = createReport(trie)
        for (let i = 2; i < report.length; i++) {
            console.log(report[i])
        }
        //console.log(report)
    }
}

main()