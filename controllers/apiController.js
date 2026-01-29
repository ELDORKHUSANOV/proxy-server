const axios = require('axios');

function getHeaders(req, contentType = 'application/json') {
    return {
        'Content-Type': contentType,
        'Host': 'test',
        'X-Real-IP': '1.2.3.4'
    };
}

module.exports = {
    timestamp: async (req, res) => {
        const pkcs7 = req.body.pk7;
        try {
            const response = await axios.post(
                'http://111.111.111.111:30999/frontend/timestamp/pkcs7',
                pkcs7,
                { headers: getHeaders(req, 'text/plain') }
            );
            res.json(response.data);
        } catch (err) {
            res.status(500).json({ error: err.response?.data || err.message });
        }
    },

    verifyAttached: async (req, res) => {
        const pkcs7 = req.body.pk7;
        try {
            const response = await axios.post(
                'http://111.111.111.111:30999/backend/pkcs7/verify/attached',
                pkcs7,
                { headers: getHeaders(req, 'text/plain') }
            );
            res.json(response.data);
        } catch (err) {
            res.status(500).json({ error: err.response?.data || err.message });
        }
    },

    join: async (req, res) => {
        const { pkcs7a, pkcs7b } = req.body;
        const pkcs7 = pkcs7a + pkcs7b;
        try {
            const response = await axios.post(
                'http://111.111.111.111:30999/frontend/pkcs7/join',
                pkcs7,
                { headers: getHeaders(req, 'text/plain') }
            );
            res.json(response.data);
        } catch (err) {
            res.status(500).json({ error: err.response?.data || err.message });
        }
    }
};
