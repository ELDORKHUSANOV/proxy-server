const axios = require('axios');

module.exports = {
    downloadIshonchnoma: async (req, res) => {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({
                error: "Parameter 'id' is required"
            });
        }

        const username = 'test';
        const password = 'test';

        const auth = 'Basic ' + Buffer
            .from(`${username}:${password}`)
            .toString('base64');

        const apiUrl =
            `http://111.111.111.111:4001/api/multicast/new/TreasInfo/GetPdf` +
            `?id=${id}&t=${Date.now()}`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: auth,
                    Accept: 'application/pdf',
                    'Cache-Control': 'no-cache'
                },
                responseType: 'arraybuffer', // PDF uchun MUHIM
                timeout: 10000,
                validateStatus: () => true
            });

            const contentType = response.headers['content-type'];

            // --- Agar JSON qaytsa ---
            if (contentType && contentType.includes('application/json')) {
                const json = JSON.parse(
                    Buffer.from(response.data).toString('utf8')
                );
                return res.status(response.status).json(json);
            }

            // --- PDF yoki binary ---
            res.status(response.status);
            res.setHeader(
                'Content-Type',
                contentType || 'application/octet-stream'
            );
            res.setHeader(
                'Content-Disposition',
                'inline; filename="document.pdf"'
            );

            res.send(Buffer.from(response.data));

        } catch (err) {
            console.error('DownloadFile xatosi:', err.message);
            res.status(500).json({
                error: err.message
            });
        }
    }
};
