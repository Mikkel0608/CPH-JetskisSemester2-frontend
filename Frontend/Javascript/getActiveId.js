//Onload function that retrieves the phonenumber of the active user
window.onload = function getActiveId() {
    fetch('http://localhost:3000/profile/user', {
        credentials: "include",
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.getElementById('loginPhone').innerHTML="Logget ind med ID: <br>" + json.userid;
        });
};