const axios = require('axios');

module.exports = {
    downloadMib: async (req, res) => {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ error: "Parameter 'id' is required" });
        }

        const username = 'mib-pdf';
        const password = 'fdsajkfh8934rt89f37823&*82134fhfff';

        const auth = 'Basic ' + Buffer
            .from(`${username}:${password}`)
            .toString('base64');

        const apiUrl =
            `http://192.168.254.111/api/integration/Mib/GetOrgSheetDocAsPdfBase64` +
            `?workNumber=${id}`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: auth,
                    Accept: 'application/pdf',
                    'Cache-Control': 'no-cache'
                },
                responseType: 'arraybuffer',
                timeout: 10000,
                validateStatus: () => true
            });

            const contentType = response.headers['content-type'];

            // --- Agar JSON qaytsa ---
            if (contentType && contentType.includes('application/json')) {
                const json = JSON.parse(response.data.toString('utf8'));
                return res.status(response.status).json(json);
            }

            // --- PDF yoki boshqa binary ---
            res.status(response.status);
            res.setHeader(
                'Content-Type',
                contentType || 'application/octet-stream'
            );
            res.setHeader(
                'Content-Disposition',
                'inline; filename="mib_document.pdf"'
            );

            res.send(Buffer.from(response.data));

        } catch (err) {
            console.error('MIB download xatosi:', err.message);
            res.status(500).json({ error: err.message });
        }
    }
};
