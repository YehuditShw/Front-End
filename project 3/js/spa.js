const app = {

    pages: [],

    // initialization
    init: function () {
        app.pages = document.querySelectorAll('.page');
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'home', '#home');
        window.addEventListener('popstate', app.poppin);
    },

    // prevent default of the links 
    nav: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        app.update(currentPage);
    },

    // show the wanted div and hide the others in event of popstate
    poppin: function (ev) {
        let hash = location.hash.replace('#', '');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        history.pushState({}, currentPage, `#${currentPage}`);
    },

    // show the wanted div and hide the others.
    update: function (currentPage) {
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        history.pushState({}, currentPage, `#${currentPage}`);
    }
}

document.addEventListener('DOMContentLoaded', app.init);