const form = document.forms['loginForm'];
firebase.auth().onAuthStateChanged(handleAuthState);
form.addEventListener('submit', handleFormSubmit);
var buttonRegister = document.getElementById("buttonRegister");


//Retorna los valores del formulario cuando detecta evento submit
function handleFormSubmit(event) {
    setLoadingButton()
    event.preventDefault();
    const email = form['email'].value;
    currentEmail = email;
    const password = form['password'].value;

    return loginUser({ email, password });
}


function loginUser({ email, password }) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {

        })
        .catch(function (error) {
            alertTryAgain(error);
            setNormalButton()
        });
}


// Detecta cambios en Auth, para validar si el usuario esta autenticado
// Si esta autenticado, valida el tipo de usuario haciendo una consulta en la BD.
function handleAuthState(user) {
    if (user) {
        successfulMessage()
        setSuccesLoginButton()
        //signoutUser()
    }
}
//Mensaje de login exitoso
function successfulMessage() {
    toastr.success("Bienvenido");
    setTimeout(function () {
        window.open('/home.html', '_self')
    }, 800);
}

function alertTryAgain(error) {
    form['password'].value = ""
    return toastr.error('Error, intenta nuevamente');
}

function signoutUser() {
    firebase.auth().signOut();
}


//Regresa el boton a su estado normal.
function setNormalButton() {
    buttonRegister.innerHTML = "";
    html = `
    <button class="btn btn-dark btn-lg btn-bloc login100-form-btn"  style="width:100%" >Iniciar Sesión</button>`;
    buttonRegister.innerHTML = html;
}

//Asigna al boton un estado de exitoso.
function setSuccesLoginButton() {
    buttonRegister.innerHTML = "";
    html = `
    <button class="btn btn-dark btn-lg btn-bloc login100-form-btn"  style="width:100%">Bienvenido</button>`;
    buttonRegister.innerHTML = html;
}


//Muestra animacion 'cargando', en boton de login.
function setLoadingButton() {
    buttonRegister.innerHTML = "";
    html = `
    <button class="btn btn-dark btn-lg btn-bloc login100-form-btn" disabled>
        <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
        Ingresando...
        </button>
        `
    buttonRegister.innerHTML = html;
}