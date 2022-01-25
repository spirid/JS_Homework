import Component from '../../../views/component';

import Tasks from '../../../models/tasks';

import EditTemplate from '../../../../templates/pages/tasks/edit';
import Error404Template from '../../../../templates/pages/error404';

class Edit extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getTask(this.request.id).then(task => {
            this.task = task;

            resolve(task);
        }));
    }

    render(task) {
        let template;

        if (this.isEditEnable()) {
            task.description = (task.description === 'No Description') ? '' : task.description;

            template = EditTemplate({task});
        } else {
            template =  Error404Template();
        }

        return new Promise(resolve => resolve(template));
    }

    afterRender() {
        this.isEditEnable() && this.setActions();
    }

    isEditEnable() {
        return Object.keys(this.task).length && this.task.status !== 'Done';
    }

    setActions() {
        const editTaskTitle = document.getElementsByClassName('task-edit__title')[0],
            editTaskDescription = document.getElementsByClassName('task-edit__description')[0],
            saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0];

        editTaskTitle.addEventListener('keyup', () => saveTaskBtn.disabled = !editTaskTitle.value.trim());
        saveTaskBtn.addEventListener('click', () => this.editTask(editTaskTitle, editTaskDescription));
    }

    editTask(editTaskTitle, editTaskDescription) {
        this.task.title = editTaskTitle.value.trim();
        this.task.description = editTaskDescription.value.trim();

        this.model.editTask(this.task).then(() => this.redirectToTaskInfo());
    }

    redirectToTaskInfo() {
        location.hash = `#/task/${this.task.id}`;
    }
}

export default Edit;