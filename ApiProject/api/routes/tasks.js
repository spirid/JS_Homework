const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.get('/api/tasks', (req, res) => res.send(fs.readFileSync(config.get('database.tasks'), 'utf8')));

router.delete('/api/tasks', (req, res) => {
    fs.writeFileSync(config.get('database.tasks'), JSON.stringify([]));

    res.sendStatus(204);
});

module.exports = router;
