export const parseRequestURL = () => {
    const url = location.hash.slice(2),
        request = {};

    [request.resource, request.id, request.action] = url.split('/');

    if (request.resource == 'tasks'){
        document.getElementById('game').style.display="block";
        document.getElementsByClassName("content-container")[0].style.visibility="hidden";
    } else if (request.resource != 'tasks') {
        document.getElementById('game').style.display="none";
        document.getElementsByClassName("content-container")[0].style.visibility="visible";
    }

    return request;
};