const axios = require('axios');

module.exports = {
    getAtmFile: async (req, res) => {
        const { id1, id2 } = req.params;

        if (!id1 || !id2) {
            return res.status(400).json({
                error: 'id1 and id2 are required'
            });
        }

        const apiUrl =
            `http://192.168.254.145/v1/atm/dmbat/file/get-file/${id1}/${id2}`;

        const username = 'dmbat_get_files';
        const password = 'pass_dmbat';

        const auth = 'Basic ' + Buffer
            .from(`${username}:${password}`)
            .toString('base64');

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: auth,
                    Accept: '*/*', // 🔴 MUHIM: har qanday fayl
                    'Cache-Control': 'no-cache'
                },
                responseType: 'arraybuffer',
                timeout: 10000,
                validateStatus: () => true
            });

            const contentType =
                response.headers['content-type'] || 'application/octet-stream';

            const disposition =
                response.headers['content-disposition'];

            // ---- Agar JSON qaytsa (xato) ----
            if (contentType.includes('application/json')) {
                const json = JSON.parse(
                    Buffer.from(response.data).toString('utf8')
                );
                return res.status(response.status).json(json);
            }

            // ---- Fayl nomini aniqlash ----
            let filename = 'downloaded_file';

            if (disposition && disposition.includes('filename=')) {
                filename = disposition
                    .split('filename=')[1]
                    .replace(/"/g, '');
            }

            // ---- Faylni 1:1 uzatish ----
            res.status(response.status);
            res.setHeader('Content-Type', contentType);
            res.setHeader(
                'Content-Disposition',
                `inline; filename="${filename}"`
            );

            res.send(Buffer.from(response.data));

        } catch (err) {
            console.error('ATM file proxy xatosi:', err.message);
            res.status(500).json({
                error: err.message
            });
        }
    }
};
