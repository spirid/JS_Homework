class Tasks {
    getTasksList() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/tasks');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }


    getTask(id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/task/${id}`);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }

    saveUserInDB(login,pass) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://localhost:3000/api/saveUserInDB');
            xhr.setRequestHeader('Content-Type', 'application/json');
            const tempObj = {
                "name" : login,"pass":pass ,"score": "0"};
            xhr.onload = () => resolve();
            xhr.send(JSON.stringify(tempObj));

        });
    }
}

export default Tasks;