(function checkLogin() {
    if (document.cookie.indexOf('jwt-token') === -1) {
        window.location.replace("Loginpage.html");
    }
})();