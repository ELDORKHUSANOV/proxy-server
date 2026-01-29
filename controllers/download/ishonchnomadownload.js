const axios = require('axios');

const servers = {
    1: {url: 'http://192.168.254.111', username: 'mib-pdf', password: '********'}
};

module.exports = {
    downloadIshonchnoma: async (req, res) => {
        const id = req.query.id;
        const serverId = req.query.server || 1;

        // if (!id) return res.status(400).json({error: "Parameter 'id' required"});
        // const server = servers[serverId];
        // if (!server) return res.status(400).json({error: "Server topilmadi"});
        //
        // const auth = 'Basic ' + Buffer.from(`${server.username}:${server.password}`).toString('base64');
        // const apiUrl = `${server.url}/api/integration/Ishonchnoma/GetDocBase64?workNumber=${id}`;
        //
        // try {
        //     const response = await axios.get(apiUrl, {headers: {Authorization: auth}, responseType: 'json'});
        //     const {data, fileName, contentType} = response.data;
        //     if (!data) return res.status(404).json({error: "Ma’lumot topilmadi"});
        //
        //     const fileBuffer = Buffer.from(data, 'base64');
        //     res.setHeader('Content-Type', contentType || 'application/octet-stream');
        //     res.setHeader('Content-Disposition', `inline; filename="${fileName || 'ishonchnoma'}"`);
            res.send('fileBuffer');
        // } catch (err) {
        //     res.status(500).json({error: err.message});
        // }
    }
};
