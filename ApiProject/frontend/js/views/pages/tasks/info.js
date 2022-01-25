import Component from '../../../views/component';

import Tasks from '../../../models/tasks';

import InfoTemplate from '../../../../templates/pages/tasks/info';
import Error404Template from '../../../../templates/pages/error404';


class Info extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getTask(this.request.id).then(task => resolve(task)));
    }

    render(task) {
        return new Promise(resolve => resolve(Object.keys(task).length ? InfoTemplate({task}) : Error404Template()));
    }
}

export default Info;