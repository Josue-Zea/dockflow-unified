const PDFMerger = require('pdf-merger-js');
const PDFDocument = require('pdfkit');
const { addWatterMark } = require('./addWaterMark');

const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const arrayBuffer = new ArrayBuffer(length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return arrayBuffer;
}

const parsePdfData = async (data, waterMark) => {
    const result = {
        correct: false,
        data: 0
    }
    try {
        const merger = new PDFMerger();
        const { rutas, edocs } = data;
        for (const ruta of rutas) {
            if (ruta.urlfile.match(/.jpg/) || ruta.urlfile.match(/.png/)) {
                const pdfDoc = new PDFDocument();
                let buffers = [];
                pdfDoc.on('data', buffers.push.bind(buffers));
                pdfDoc.on('end', async () => {
                    let pdfData = Buffer.concat(buffers);
                    await merger.add(pdfData);
                });
                // Agregar la imagen al PDF
                pdfDoc.image(ruta.urlfile, {
                    fit: [250, 300],
                    align: 'center',
                    valign: 'center'
                });
                pdfDoc.end();
            } else {
                await merger.add(ruta.urlfile);
            }
        }
        for (const ruta of edocs) {
            if (ruta.b64 !== '' && ruta.b64 !== null) {
                await merger.add(base64ToArrayBuffer(ruta.b64));
            } else if (ruta.strb64 !== '' && ruta.strb64 !== null){
                await merger.add(base64ToArrayBuffer(ruta.strb64));
            }
        }
        result.correct = true;
        result.data = await merger.saveAsBuffer();
    } catch (e) {
        console.log(e);
    }
    if(waterMark){
        result.data = await addWatterMark(result.data);
    }
    return result;
}

module.exports = {
    parsePdfData,
};