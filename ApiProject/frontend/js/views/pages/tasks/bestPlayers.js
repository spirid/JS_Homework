import Component from '../../../views/component';

import Tasks from '../../../models/tasks';

import BestPlayersTemplate from '../../../../templates/pages/bestPlayer.hbs';

class BestPlayers extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getTask(this.request.id).then(task => resolve(task)));
    }

    render(task) {
        return new Promise(resolve => resolve(BestPlayersTemplate({task})));
    }
}

export default BestPlayers;