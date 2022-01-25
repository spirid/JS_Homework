import '../styles/app';

import {parseRequestURL} from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import About from './views/pages/about';
import Error404 from './views/pages/error404';

import AddAndList from './views/pages/tasks/add-list';
import Info from './views/pages/tasks/info';
import Rules from './views/pages/tasks/rules';
import Edit from './views/pages/tasks/edit';
import LoginForm from './views/partials/loginForm';
import BestPlayer from './views/pages/tasks/bestPlayers';


setInterval(()=>{
    document.getElementsByClassName('time')[0].text=(Date().slice(16,-37));
},1000);

const Routes = {
    '/': About,
    '/tasks': AddAndList,
    '/task/:id': Info,
    '/task/:id/edit': Edit,
    '/rules': Rules,
    '/bestPlayers' : BestPlayer
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        loginContainer = document.getElementsByClassName('login-container')[0],
        header = new Header(),
        footer = new Footer(),
        loginForm = new LoginForm();


    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });
    loginForm.render().then(html => loginContainer.innerHTML = html);
    header.render().then(html => {
        headerContainer.innerHTML = html;
        header.afterRender();
    });
    footer.render().then(html => footerContainer.innerHTML = html);
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);
