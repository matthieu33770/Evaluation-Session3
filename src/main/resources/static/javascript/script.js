const signInChoice = document.getElementById("signIn")
const logInChoice = document.getElementById("logIn")
const logInContextHtml = document.getElementById("logInContext")
const signInContextHtml = document.getElementById("signInContext")
const userContextHtml = document.getElementById("alert-success")
<<<<<<< HEAD
const tableContextHtml = document.getElementById("afficheTable")

let isAuthenticated = false;
=======
<<<<<<< Updated upstream
const tableContextHtml = document.getElementById("userTable")

let isAuthenticated = false;
let table = $('#usersTable').DataTable();
=======
const failContextHtml = document.getElementById("alert-danger")
const adminContextHtml = document.getElementById("adminContext")


>>>>>>> Stashed changes
>>>>>>> 38135e777a865414ba791287d413afa06f7feedd

logInChoice.addEventListener("click", logInContext)
signInChoice.addEventListener("click", signInContext)

$(document).ready(function () {
    console.log("chargement de la page")
    $("#logSubmit").click(function () {
        isLoging()
    })
    $("#signSubmit").click(function () {
        isSigning()
    })
    $("#logo").click(function () {
        location.reload()
    
    })
<<<<<<< HEAD
    if (isAuthenticated) {
        userContext()
    }
=======
>>>>>>> 38135e777a865414ba791287d413afa06f7feedd

});

function logInContext() {
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

function userContext() {
    console.log("starting authContext")
    signInChoice.style.display = "none"
    logInChoice.style.display = "none"
    signInContextHtml.style.display = "none"
    logInContextHtml.style.display = "none"
    userContextHtml.style.display = "block"
    setTimeout(() => {
        userContextHtml.style.display = "none"
    },3000)
    getUsers()
    tableContextHtml.style.display = "block"
    console.log("authContext load ")
}

function adminContext() {
    console.log("starting adminContext")
    logInChoice.style.display = "none"
    logInContextHtml.style.display = "none"
    adminContextHtml.style.display = "block"
    userList()

    console.log("adminContext load ")
}

function isUnknown() {
    logInContextHtml.style.display = "none"
    failContextHtml.style.display = "block"
    setTimeout(() => {
        failContextHtml.style.display = "none"
    }, 3000)
    setTimeout(() => {
        signInContextHtml.style.display = "block"
    }, 3000)

function getUsers(){
	$('#usersTable').DataTable({
		destroy: true,
        "columnDefs": [
                {
                    "targets": [ 0 ],
                    "sortable" : true
                },
        {
                    "targets": [ 1 ],
                    "visible": true
                },
        {
                    "targets": [ 2 ],
                    "visible": true
                },
        {
                    "targets": [ 3 ],
                    "visible": true
                }
            ],
        "ajax" : {
            url : '/home/isAdmin',
            dataSrc : ''
        },
        "columns" : [ 
            {"data" : "prenom"},
            {"data" : "nom"}, 
            {"data" : "email"},
            {"data" : "habilitation.fonction"} ]
    });
}

function isLoging() {
    let user = {}
    let url = "/home/emailLog"
    user["email"] = $("#logEmail").val()
    $.ajax({
<<<<<<< HEAD
        type: "POST",
        contentType: "application/json",
        url: url + "/" + user["email"],
        data: JSON.stringify(user),
        dataType: 'json',
        cache: 'false',
        timeout: 60000,

        success: function (data) {
        	isAuthenticated = true;
            userContext()
            console.log(user)
=======
            type: "POST",
            contentType: "application/json",
            url: url + "/" + user["email"],
            data: JSON.stringify(user),
            dataType: 'json',
            cache: 'false',
            timeout: 60000,

            success: function (data) {
                console.log(data)
                if (data[0].habilitation.fonction == "admin") {
                    adminContext()
                } else userContext()
                console.log(user)
            },

            error: function (data) {
                isUnknown()

            }
>>>>>>> 38135e777a865414ba791287d413afa06f7feedd
        }

    )
}

function isSigning() {
    let user = {}
    let role = {
        fonction: "user",
        id_role: 2
    }
    let url = "/home/user"

    user["nom"] = $("#signNom").val()
    user["prenom"] = $("#signPrenom").val()
    user["email"] = $("#signEmail").val()
    user["habilitation"] = role

    var request = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: JSON.stringify(user),
        dataType: 'json',
        cache: 'false',
        timeout: 60000,

        success: function (data) {
            userContext()
            console.log(data)
        },
        error: function (data) {

        }


    })

}

function userList() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url:"/home/isAdmin",
        data:{},
        dataType: "json",
        cache: false,
        timeout: 60000,
        sucess: function (data) {
            console.log(data.stringify())
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