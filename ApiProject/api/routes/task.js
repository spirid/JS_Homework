const express = require('express'),
      router = express.Router(),
      config = require('config'),
      fs = require('file-system'),
      shortId = require('shortid');

router.post('/api/task', (req, res) => {
    const tasksData = getTasksFromDB(),
        task = req.body;

    task.id = shortId.generate();
    task.description = task.description.trim() || 'No Description';
    task.status = 'In Progress';

    tasksData.push(task);
    setTasksToDB(tasksData);

    res.send(task);
});

router.post('/api/rules',(req, res) => {
    res.sendStatus(204);
});


router.get('/api/task/:id', (req, res) => {
    const tasksData = getTasksFromDB(),
        task = tasksData.find(task => task.id === req.params.id);

    task ? res.send(task) : res.send({});
});





router.post('/api/saveUserInDB', (req, res) => {
    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect(function(err, client) {
        const db = client.db("testDB");
        const collection = db.collection("users");
        let user = req.body;
        collection.insertOne(user, function(err, result) {
            if (err) {
                return err;
            }
            console.log(result.ops);
            client.close();
        });
    })
});



function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(config.get('database.tasks'), 'utf8'));
}

function setTasksToDB(tasksData) {
    fs.writeFileSync(config.get('database.tasks'), JSON.stringify(tasksData));
}

module.exports = router;