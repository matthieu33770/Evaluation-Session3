$(document).ready(function () {
    console.log("chargement de la page")
    $("#logSubmit").click(function () {
        isAuth()
    })

});
const signInChoice = document.getElementById("signIn")
const logInChoice = document.getElementById("logIn")
const logInContextHtml = document.getElementById("logInContext")
const signInContextHtml = document.getElementById("signInContext")

logInChoice.addEventListener("click", logInContext)
signInChoice.addEventListener("click", signInContext)

function logInContext() {
    //document.createElement("div").appendChild(header)
    console.log("starting logInContext")

    signInChoice.style.display = "none"
    logInChoice.style.display = "none"
    logInContextHtml.style.display = "block"
    console.log("logInContext load ")

}

function signInContext() {
    console.log("starting signInContext")
    signInChoice.style.display = "none"
    logInChoice.style.display = "none"
    signInContextHtml.style.display = "block"
    console.log("signInContext load ")

}



function isAuth() {
    let customer = {}
    let url = "/home/emailLog"

    customer["email"] = $("#logEmail").val()
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: JSON.stringify(customer),
        dataType: 'json',
        cache: 'false',
        timeout: 60000,

        success: function (data) {
            console.log(customer)
        }
    })
}

/* function getBynom(e) {

    var nom = $("#nom".val())
    e.preventDefault();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/api/byname/" + nom,
        data: {}, ///reponse  entity
        datatType: 'json',
        cache: false,
        timeout: 60000,
        sucess: function (data) {
            var json = "<h3>Server Response format Json</h3><pre>Apprenant trouvé : <br>" + JSON.stringify(data, null, 4) + "</pre>";

            $('#result').html(json);
            $("#prenom").val(data.prenom);
            $("#nom").val(data.nom);
            $("#email").val(data.email);
            console.log("SUCCESS : ", data);

        },
        error: function (e) {
            var json = "<h3>Server Response</h3><pre>" + e.responseText + "</pre>";
            $("#resultat").html(json);
            console.log("ERROR : ", e);
        }
    })
} */