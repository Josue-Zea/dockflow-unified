const { PDFDocument, rgb, StandardFonts, degrees } = require('pdf-lib');

const addWatterMark = async (pdf) => {
  // Carga el diploma en un documento PDF
  const pdfDoc = await PDFDocument.load(pdf);

  // Obtiene la primera página del PDF
  const pages = pdfDoc.getPages();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.CourierBold)

  const texto = "COPIA";

  for (const page of pages) {
    const { width, height } = page.getSize();
    const rotation = page.getRotation();
    let x = width / 2;
    let y = height / 2;
    const isRotated = width === 842 && height === 595;
    const isSmall = width <= 255 && height <= 160;
    const fontSize = isRotated ? 260 :
      isSmall ? 70 :
        240;
    let deg = isRotated ? 35 :
      isSmall ? 27
        : 45;

    if (rotation.angle !== 0) {
      if (rotation.angle === 90) {
        deg = 135;
        y = 330;
        x = 850;
      } else if (rotation.angle === 270) {
        deg = -45;
        y = 755;
        x = 300;
      }
    }
    const configs = {
      x: fontSize === 240 ? x - fontSize + 20 : x - fontSize - 20,
      y: y - fontSize,
      font: timesRomanFont,
      size: fontSize,
      color: rgb(0, 0, 1),
      rotate: degrees(deg),
      opacity: 0.3, // Transparencia
    }
    page.drawText(texto, configs);
  }

  // Guarda el PDF modificado
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

module.exports = {
  addWatterMark
}