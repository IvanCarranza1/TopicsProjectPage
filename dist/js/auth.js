function signoutUser() {
    firebase.auth().signOut();
    setTimeout(function () {
        window.open('/index.html', '_self')
    }, 800);
}