const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const GUESTBOOK_FILE = path.join(__dirname, 'guestbook.json');

// MIME types for static files
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.gif': 'image/gif',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Read guestbook entries
function getEntries() {
    try {
        const data = fs.readFileSync(GUESTBOOK_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

// Save guestbook entries
function saveEntries(entries) {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(entries, null, 2));
}

// Handle requests
const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API: Get guestbook entries
    if (req.url === '/api/guestbook' && req.method === 'GET') {
        const entries = getEntries();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(entries));
        return;
    }

    // API: Add guestbook entry
    if (req.url === '/api/guestbook' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const { name, message } = JSON.parse(body);
                if (!name || !message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Name and message required' }));
                    return;
                }

                const entries = getEntries();
                entries.push({
                    name: name.slice(0, 50),
                    message: message.slice(0, 500),
                    date: new Date().toISOString()
                });
                saveEntries(entries);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }

    // Serve static files
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n~*~ SLOW TV SERVER ~*~`);
    console.log(`Running at http://localhost:${PORT}`);
    console.log(`\nGuestbook entries stored in: ${GUESTBOOK_FILE}`);
    console.log(`Edit that file directly to delete messages!\n`);
});
