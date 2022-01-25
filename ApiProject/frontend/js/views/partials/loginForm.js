import Component from '../../views/component';

import LoginFormTemplate from '../../../templates/partials/loginForm';

class LoginForm extends Component {
    render() {
        return new Promise(resolve => resolve(LoginFormTemplate()));
    }
}

export default LoginForm;