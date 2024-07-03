import { createTrie } from "./trie.js"
import { createReport } from "./report.js"

async function main() {
    if (process.argv.length < 3) {
        throw new Error("Error: Does not include URL")
    } else if (process.argv.length > 3) {
        throw new Error("Error: Too many arguments")
    } else {
        const url = process.argv[2]
        const trie = await createTrie(url)
        const report = createReport(trie)
        console.log(report)
    }
}

main()