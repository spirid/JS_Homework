import Component from '../../views/component';

import HeaderTemplate from '../../../templates/partials/header';
import Tasks from "../../models/tasks";

class Header extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    render() {
        const resource = this.request.resource;

        return new Promise(resolve => resolve(HeaderTemplate({
            isAboutPage: !resource,
            isTasksPage: (resource === 'tasks'),
            isBestPlayersPage: (resource ===  'bestPlayers'),
            isRulePage: (resource === 'rules'),
            isLogin: localStorage.length > 1,
            loginName: localStorage.getItem("login")
        })));
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const btnShowLogin = document.getElementById('show'),
            contentConeainer = document.getElementsByClassName('content-container')[0],
            submitInForm=document.getElementById('submit');

        btnShowLogin.addEventListener('click', () => this.loginShow(contentConeainer));
        submitInForm.addEventListener('click', () => {
            const userName = document.getElementsByTagName('input')[0].value,
                password = document.getElementsByTagName('input')[1].value;
            this.model.saveUserInDB(userName, password);
            this.loginShowRemove(contentConeainer, btnShowLogin, userName);
        });

        localStorage.length > 1 ? this.showLoginLS(btnShowLogin) : document.getElementById('userNameInPage').style.display = 'none';
    }

    loginShow(btnShow) {
        btnShow.classList.add('shadowBackground');
        document.getElementsByClassName('login-container')[0].classList.add('show');
    }

    showLoginLS(btnShowLogin){
        document.getElementById("userNameInPage").textContent=`Hello, ${localStorage.getItem("login")}`;
        btnShowLogin.style.display='none';
    }

    loginShowRemove(btnShow,btnLogin,userName) {
        btnShow.classList.remove('shadowBackground');
        document.getElementsByClassName('login-container')[0].classList.remove('show');
        alert("user Connect");
        btnLogin.style.display = 'none';
        document.getElementById("userNameInPage").textContent=`Hello, ${userName}`;
        localStorage.setItem('login', `${userName}`);
    }
}

export default Header;