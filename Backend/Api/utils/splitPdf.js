const splitPdf = (base64Data, chunkSize = 1024 * 1024) => {
    return new Promise((resolve, reject) => {
        try {
            const data = Buffer.from(base64Data, 'base64');
            const totalChunks = Math.ceil(data.length / chunkSize);
            const fileChunks = [];

            for (let i = 0; i < totalChunks; i++) {
                const start = i * chunkSize;
                const end = (i + 1) * chunkSize;
                fileChunks.push(data.slice(start, end));
            }

            resolve(fileChunks);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { splitPdf };
