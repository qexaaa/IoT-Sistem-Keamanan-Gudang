function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    auth.signInWithEmailAndPassword(
        email,
        password
    )

    .then((userCredential) => {

        localStorage.setItem(
            "email",
            userCredential.user.email
        );

        window.location.href =
            "dashboard.html";

    })

    .catch((error) => {

        document.getElementById(
            "errorMessage"
        ).innerText =
            error.message;

    });

}