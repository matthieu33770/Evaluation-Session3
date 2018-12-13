$(document).ready(function() {

	// appelle la méthode pour charger la base données dans la datatable
	loadDatatable();
	
	// déclaration d'une variable table;
	var table = $('#userTable').DataTable();
	
	/* Si vous double-cliquez sur une ligne de la datatable
	   vous récupérez la valeur des attributs de la ligne concernée (row)
	   aux différentes zones de saisie
	*/
	$('#userTable tbody').on( 'dblclick', 'tr', function () {
	    let dataRow = table.row( this ).data();
	    $("#id").val(dataRow.id);
		$("#prenom").val(dataRow.prenom);
		$("#nom").val(dataRow.nom);
		$("#email").val(dataRow.email);
		$("#habilitation").val(dataRow.habilitation);
	} );
	
	// si vous cliquez sur le bouton click "btn-post"
	// on appelle la méthode "apprenant_submit()
	// en lui passant 2 paramètres : la référence du bouton pour le désactiver et la type de méthode, ici POST.
	$("#btn-post").click(function() {
		const conf = confirm("Etes-vous sûr de vouloir ajouter cette entrée?");
		if (conf){
			user_submit($("#btn-post"), "POST", table);
			
		}
	
	
	
	});

	// si vous cliquez sur le bouton click "btn-put"
	// on appelle la méthode "apprenant_submit()
	// en lui passant 2 paramètres : la référence du bouton pour le désactiver et la type de méthode, ici PUT.
	$("#btn-put").click(function() {
		user_submit($("#btn-put"), "PUT", table);
	
	});

	//click on RESET
	$("#btn-reset").click(function() {
		
		resetForm(); // méthode qui met les valeurs des zones de textes du formulaire à blanc
		resetFeedBackUser();
	});

	//click on GET
	$("#btn-get").click(function() {
		getUser(); // affiche l'apprenant(e) sélectionné(e) dans la DataTable
	});

	//click on DELETE
	$("#btn-delete").click(function() {
		deleteUser(); // efface l'apprenant en fonction de l'identifiant
		
		
	});
});

/**
 * Charge les données dans la DataTable (JQuery)
 * @returns
 */
function loadDatatable() {
	$('#userTable').DataTable({
		"columnDefs": [
	            {
	                "targets": [ 0 ],
	                "sortable" : false
	            },
	            {
	                "targets": [ 4 ],
	                "visible": true
	            }
	        ],
		"ajax" : {
			url : '/api/users',
			dataSrc : ''
		},
		"columns" : [ 
			{"data" : "id"},
			{"data" : "prenom"},
			{"data" : "nom"}, 
			{"data" : "email"},
			{"data" : "habilitation"} ]
	});
	
}
/**
 * Méthode qui traite les POST et PUT
 * @param button
 * @param httpVerb
 * @returns
 */
function user_submit(button, httpVerb, table) {

	var user = {};
	// on récupère les valeurs saisies
	user["id"] = $("#id").val();
	user["prenom"] = $("#prenom").val();
	user["nom"] = $("#nom").val();
	user["email"] = $("#email").val();
	user["habilitation"] = $("#habilitation").val();
	
	// on initialise l'url du back
	var url = "/api/users";
	
	// si c'est une modification, on passe l'identifiant
	if(httpVerb == "PUT")
		url += "/" + apprenant["id"];
	
	// on désactive le bouton en cours 
	button.prop("disabled", true);

	// on lance la méthode ajax pour faire le lien avec les méthodes back du constructeur
	$.ajax({
		type : httpVerb,						// méthode POST ou PUT
		contentType : "application/json",		// type de données
		url : url,								// url destinatrice
		data : JSON.stringify(apprenant),		// on transforme les données de la variable Javascript "apprenant" en format JSON
		dataType : 'json',						// on précise le mode de transfert
		cache : false,							// pas de cache sollicité
		timeout : 600000,						// délai d'attente
		success : function(data) {				// si ok

			var json = "<h3>Server Response au format JSON</h3><pre>user (modifié/ajouté) :<br>" + JSON.stringify(data, null, 4) + "</pre>";
			
			$('#feedbackuser').html(json); // renvoie les infos aux format JSON adapté au HTML dans la balise "<DIV id="feedbackapprenant"> 

			console.log("SUCCESS : ", data);
			button.prop("disabled", false);

			resetForm()
		},
		error : function(e) {

			var json = "<h3>Server Response</h3><pre>" + e.responseText	+ "</pre>";
			
			$('#feedbackuser').html(json);

			console.log("ERROR : ", e);
			button.prop("disabled", false);

		}
	});
	
	table.ajax.reload(); // on recharge les données via ajax et la méthode reload()
}

function resetForm() {
	$('#user-form')[0].reset();
}

function resetFeedBackUser() {
	$('#feedbackuser').html("");
}

/**
 * Méthode qui récupère un apprenant
 * @returns
 */
function getUser() {

	var idUser = $("#id").val(); // on récupère la variable

	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : "/api/users/" + idApprenant,
		data : {},
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {

			var json = "<h3>Server Response format JSON</h3><pre>Apprenant trouvé :<br>" + JSON.stringify(data, null, 4) + "</pre>";
			$('#feedbackuser').html(json);
			$("#id").val(data.id);
			$("#prenom").val(data.prenom);
			$("#nom").val(data.nom);
			$("#email").val(data.email);
			$("#habilitation").val(data.habilitation);
			console.log("SUCCESS : ", data);
		},
		error : function(e) {

			var json = "<h3>Server Response</h3><pre>" + e.responseText	+ "</pre>";
			
			$('#feedbackuser').html(json);

			console.log("ERROR : ", e);
		}
	});
}

/**
 * méthode pour supprimer un apprenant
 * @returns
 */
function deleteUser() {

	var idApprenant = $("#id").val();

	$.ajax({
		type : "DELETE",
		contentType : "application/json",
		url : "/api/apprenant/" + idApprenant,
		//data : {},
		//dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {

			var json = "<h3>Server Response</h3><pre>User " + idApprenant + " deleted.</pre>";
			$('#feedbackuser').html(json);
			console.log("SUCCESS : ", data);

			resetForm();
		},
		error : function(e) {
			var json = "<h3>Server Response</h3><pre>" + e.responseText	+ "</pre>";
			
			$('#feedbackuser').html(json);
			console.log("ERROR : ", e);
		}
	});
	table.reload();
}
