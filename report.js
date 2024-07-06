function createReport(trie) {
    const words = searchTrie(trie, '', [])
    const report = []
    for (let word of words) {
        if (word[1] > 1) {
            report.push(`This web page contains the word '${word[0]}', ${word[1]} times`)
        } else {
            report.push(`This web page contains the word '${word[0]}', ${word[1]} time`)
        }
    }
    return report
}

function searchTrie(trie, prefix, words) {
    const end = '*'
    if (trie[end]) {
        words.push([prefix, trie[end]])
    }
    let keys = Object.keys(trie)
    for (let key of keys.sort()) {
        if (key !== end) {
            let cur_prefix = prefix + key
            words = searchTrie(trie[key], cur_prefix, words)
        }
    }
    return words
}

export { createReport }