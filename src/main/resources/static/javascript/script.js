const signInChoice = document.getElementById("signIn")
const logInChoice = document.getElementById("logIn")
const logInContextHtml = document.getElementById("logInContext")
const signInContextHtml = document.getElementById("signInContext")
const userContextHtml = document.getElementById("alert-success")
const tableContextHtml = document.getElementById("afficheTable")
const failContextHtml = document.getElementById("alert-danger")
const adminContextHtml = document.getElementById("adminContext")
const editingContextHtml = document.getElementById("editingContext")


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


    function getUsers() {
        $('#usersTable').DataTable({
            destroy: true,
            "columnDefs": [{
                    "targets": [0],
                    "sortable": true
                },
                {
                    "targets": [1],
                    "visible": true
                },
                {
                    "targets": [2],
                    "visible": true
                },
                {
                    "targets": [3],
                    "visible": true
                }
            ],
            "ajax": {
                url: '/home/isAdmin',
                dataSrc: ''
            },
            "columns": [{
                    "data": "prenom"
                },
                {
                    "data": "nom"
                },
                {
                    "data": "email"
                },
                {
                    "data": "habilitation.fonction"
                }
            ]


        });
    }
    //getUsers()
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
    }, 3000)
    console.log("authContext load ")
}

function adminContext() {
    console.log("starting adminContext")
    logInChoice.style.display = "none"
    logInContextHtml.style.display = "none"
    adminContextHtml.style.display = "block"
    getAllUsers()
    console.log("adminContext load ")
}

function editingContext() {
    console.log("starting editingContext")
    adminContextHtml.style.display = "none"
    editingContextHtml.style.display = "block"
    console.log("editingContext load ")
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
}
/*
 * requete qui delete un user
 */
function deleteUser(data) {
    let url = "/home/delete"
    let user = {}
    user["id"] = data
    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: url + "/" + user["id"],
        data: JSON.stringify(user),
        dataType: 'json',
        cache: 'false',
        timeout: 60000,
        success: function () {
            console.log("hello")
        }
    })
}

/*
 * requete qui verifie si le params envoyé 
 * est present en db et selon la reponse recue 
 * on determine  le role du connecté
 */
function isLoging() {
    let user = {}
    let url = "/home/emailLog"
    user["email"] = $("#logEmail").val()
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url + "/" + user["email"],
        data: JSON.stringify(user),
        dataType: 'json',
        cache: 'false',
        timeout: 60000,

        success: function (data) {
            if (data[0].habilitation.fonction == "admin") {
                adminContext()
            } else userContext()
        },

        error: function (data) {
            isUnknown()

        }
    })
}
/*
 * création d'un nouvel utilisateur
 *
 */
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
        },
        error: function (data) {

        }
    })

}
/*
 * recuperé tous les users dans le contexte admin
 *
 */
function getAllUsers() {
    $.ajax({
        type: "GET",
        contentType: "application:json",
        url: "/home/isAdmin",
        data: {},
        dataType: "json",
        cache: false,
        timeout: 60000,
        success: function (data) {
            const userData = data
            let i = 0
            while (i <= userData.length - 1) {
                userCardCreate(i, "adminContext align-self-center")
                paramsUserCardsCreate(i)
                editUserCard(userData[i], i)
                const usersData = document.getElementById("userId.card-" + i)
                usersData.addEventListener("dblclick", function () {
                    const attrId = usersData.getAttribute("id").valueOf()
                    const numAttrId = attrId.split("userId.card-")
                    editingContext()
                    userEditCardCreate(1, "editingContext align-self-center")
                    paramsUserEditCardsCreate(userData[numAttrId[1]], 1)
                    editOneUserCard(userData[numAttrId[1]], 1)
                    $(".btn-danger").click(() => {
                        console.log("data: ", userData[numAttrId[1]].id)
                        console.log("data: ", data)
                        console.log("window: ", window)
                        console.log("this: ", this)
                        deleteUser(userData[numAttrId[1]].id)
                        adminContextHtml.parentNode.removeChild(adminContextHtml)
                        editingContextHtml.parentNode.removeChild(editingContextHtml)
                        divCreate("body", "div", "adminContext align-self-center")
                        divCreate("body", "div", "editingContext align-self-center")
                        try {
                          setTimeout(adminContext(),2000)  
                        } catch (error) {
                            console.error(error)
                        }
                    })
                })
                console.log(usersData)
                i++
            }
        }
    })
}
/*
 * creation des "cards" qui recoivent les données users
 * ici on met en place le html
 */
function userCardCreate(i, context) {

    divCreate(context, "div", "container cardUser" + " card-" + (i))
    divCreate("container cardUser" + " card-" + (i), "div", "row cardUserFormat" + " card-" + (i))
    divCreate("row cardUserFormat" + " card-" + (i), "div", "col col-sm-6 cardFormat" + " card-" + (i))
    divCreate("col col-sm-6 cardFormat" + " card-" + (i), "div", "card border-secondary mb-3 text-center" + " card-" + (i))
    divCreate("card border-secondary mb-3 text-center card-" + i, "div", "card-header user card-" + i, "userId.card-" + (i))
    divCreate("card border-secondary mb-3 text-center" + " card-" + (i), "div", "card-body text-secondary" + " card-" + (i))
    divCreate("text-secondary" + " card-" + (i), "ul", "list-group list-group-flush" + " card-" + (i))
}
/*
 * creation la card qui sera editable 
 * ici on met en place le html
 */
function userEditCardCreate(i, context) {

    divCreate(context, "div", "container cardEdit card-" + (i))
    divCreate("container cardEdit card-" + (i), "div", "row cardEditFormat card-" + (i))
    divCreate("row cardEditFormat card-" + (i), "div", "col col-sm-6 cardFormatEdit" + " card-" + (i))
    divCreate("col col-sm-6 cardFormatEdit" + " card-" + (i), "div", "card border-secondary mb-3 text-center Edit" + " card-" + (i))
    divCreate("card border-secondary mb-3 text-center Edit card-" + i, "div", "card-header userEdit card-" + i, "userIdEdit.card-" + (i))
    divCreate("card border-secondary mb-3 text-center Edit card-" + i, "div", "card-body text-secondary Edit" + " card-" + (i))
    divCreate("text-secondary Edit" + " card-" + (i), "li", "list-group list-group-flush Edit" + " card-" + (i))
    divCreate("card-body text-secondary Edit" + " card-" + (i), "button", "btn btn-danger")
    divCreate("card-body text-secondary Edit" + " card-" + (i), "button", "btn btn-warning")
}
/*
 * petit outil pour faciliter la creation des div qui forment les cards
 *
 */
function divCreate(destClass, BlockType, NewBlockClass, newBlockId) {
    let dest = document.getElementsByClassName(destClass)
    let newBlock = document.createElement(BlockType)
    newBlock.className = NewBlockClass
    if (newBlockId) {
        newBlock.id = newBlockId
    }
    dest[0].appendChild(newBlock)
}
/*
 * creation des dernieres balises des cards qui  
 * recevront des données dynamiques
 */
function paramsUserCardsCreate(i) {
    let j = 0
    while (j <= 2) {
        let bodyCard = document.getElementsByClassName("list-group-flush" + " card-" + i)
        let liUser = document.createElement("li")
        liUser.className = "list-group-item text-center" + " card-" + i
        if (j == 0) {
            liUser.id = "userName card-" + i
        } else if (j == 1) {
            liUser.id = "userLastName card-" + i
        } else if (j == 2) {
            liUser.id = "userEmail card-" + i
        }
        bodyCard[0].appendChild(liUser)
        j++
    }
}
/*
 * creation des dernieres balises de la card a modifié 
 * 
 */
function paramsUserEditCardsCreate(data, i) {
    let j = 0
    while (j <= 2) {
        let bodyCard = document.getElementsByClassName("list-group-flush Edit" + " card-" + i)
        let liUser = document.createElement("input")
        liUser.className = "list-group-item text-center " + " card-" + i
        if (j == 0) {
            liUser.placeholder = data.nom
        } else if (j == 1) {
            liUser.placeholder = data.prenom
        } else if (j == 2) {
            liUser.placeholder = data.email
        }
        bodyCard[0].appendChild(liUser)
        j++
    }
}
/*
 * implementation des donnees dynamiques dans les cards
 *
 */
function editUserCard(data, i) {
    let idType = ["userName card-" + i, "userLastName card-" + i, "userEmail card-" + i, "userId.card-" + i]
    document.getElementById(idType[0]).innerHTML = data.nom
    document.getElementById(idType[1]).innerHTML = data.prenom
    document.getElementById(idType[2]).innerHTML = data.email
    document.getElementById(idType[3]).innerHTML = `utilisateur : ${data.id}`

}
/*
 * implementation des donnees dynamiques dans la card modifiable
 *
 */
function editOneUserCard(data, i) {
    let idType = ["userIdEdit.card-1"]
    console.log(document.getElementById(idType[0]))
    document.getElementById(idType[0]).innerHTML = `utilisateur : ${data.id}`
    document.getElementsByClassName("btn btn-danger")[0].innerHTML = "effacer"
    document.getElementsByClassName("btn btn-warning")[0].innerHTML = "modifier"

}

/* je le conserve a titre d'exemple
function getBynom(e) {

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