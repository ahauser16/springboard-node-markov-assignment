// src/makeText.js
const fs = require('fs');
const axios = require('axios');
const path = require('path'); // Ensure path is required
const { MarkovMachine } = require('./markov');

function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

function makeTextFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${path}: ${err}`);
            process.exit(1);
        }
        generateText(data);
    });
}

function makeTextFromUrl(url) {
    axios.get(url)
        .then(response => {
            generateText(response.data);
        })
        .catch(err => {
            console.error(`Error fetching ${url}: ${err}`);
            process.exit(1);
        });
}

function main() {
    const method = process.argv[2];
    const source = process.argv[3];

    if (!method || !source) {
        console.error('Usage: node makeText.js <file|url> <path|url>');
        process.exit(1);
    }

    if (method === 'file') {
        // Construct the file path using path.join
        const filePath = path.join(__dirname, '..', 'data', source);
        makeTextFromFile(filePath);
    } else if (method === 'url') {
        makeTextFromUrl(source);
    } else {
        console.error('Invalid method. Use "file" or "url".');
        process.exit(1);
    }
}

main();
