// Levantamiento del servidor

const http = require('http');
const fs = require('fs');
const url = require ('url');
const Jimp = require('jimp');

http.createServer((req, res) => {

    const params = url.parse(req.url, true).query

    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
        fs.readFile('web/index.html', 'utf8', (err, html) => {
            res.write(html);
        });
    }
    // Paso 2
    if (req.url == '/estilos') {
        res.writeHead(200, { 'Content-Type': 'text/css' })
        fs.readFile('web/assets/css/estilos.css', (err, css) => {
            res.write(css);
            res.end()
        });
    }

   

    if (req.url.includes( '/imagen')){
        Jimp.read(params.nurl, (err, imagen) => {
            
            imagen
                .resize(350, Jimp.AUTO)
                .quality(60)
                .grayscale()
                .writeAsync('newImg.jpg')
                .then(() => {
                    
                    fs.readFile('newImg.jpg', (err, imagenArchivo) => {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.end(imagenArchivo);
                    });

                });
                
        });

    }

})
    .listen(3000, () => console.log('Servidor encendido'));

 