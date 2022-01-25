import Component from '../../../views/component';

import Tasks from '../../../models/tasks';

import RulesTemplate from '../../../../templates/pages/rules.hbs';

class Rules extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getTask(this.request.id).then(task => resolve(task)));
    }

    render(task) {
        return new Promise(resolve => resolve(RulesTemplate({task})));
    }
}

export default Rules;