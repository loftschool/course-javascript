const fs = require('fs');
const http = require('http');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Busboy = require('busboy');

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  try {
    if (/\/photo\/.*/.test(req.url) && req.method === 'GET') {
      const [, id] = req.url.match(/\/photo\/(.*)/) || [];
      const filePath = path.resolve(__dirname, 'photos', id);
      if (fs.existsSync(filePath) && fs.existsSync(filePath + '.metadata')) {
        const metadata = JSON.parse(fs.readFileSync(filePath + '.metadata'));
        res.setHeader('Content-Type', metadata.mimetype);
        return fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        return res.end('Not found');
      }
    }

    if (req.url === '/photo' && req.method === 'POST') {
      let metadata = {};
      const id = uuidv4();
      const filePath = path.resolve(__dirname, 'photos', id);
      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        metadata = { id, filename, encoding, mimetype };
        file.pipe(fs.createWriteStream(filePath));
        fs.writeFileSync(filePath + '.metadata', JSON.stringify(metadata));
      });
      busboy.on('finish', function () {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(metadata));
      });
      return req.pipe(busboy);
    }

    res.writeHead(404);
    res.end();
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    return res.end(e.toString());
  }
});

server.listen(parseInt(process.env.PHOTO_PORT) || 8282);
