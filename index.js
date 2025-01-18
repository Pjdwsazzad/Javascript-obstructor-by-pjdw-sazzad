// Backend: Node.js Code Obfuscator Server (ES Module Compatible)

import express from 'express';
import bodyParser from 'body-parser';
import JavaScriptObfuscator from 'javascript-obfuscator';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Obfuscation endpoint
app.post('/obfuscate', (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        debugProtection: true,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75
    }).getObfuscatedCode();

    res.json({ obfuscatedCode });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

/*
 * Instructions:
 * 1. Install dependencies: npm install express body-parser javascript-obfuscator
 * 2. Create a 'public' folder and add the HTML file there.
 * 3. Run this script: node nodejs_code_obfuscator.js
 * 4. Access the app at http://localhost:3000
 */
