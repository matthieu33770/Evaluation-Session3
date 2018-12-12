package co.simplon.eval3.projet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import java.io.Serializable;


@Entity
@Table(name = "users")
public class User implements Serializable{

	//default serial
	private static final long serialVersionUID = 1L;
	
	public User() {
		super();
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_users")
	private long id;
	
	@Size(max = 100)
	@Column(name = "prenom")
	private String prenom;
	
	@Size(max = 100)
	@Column(name = "nom")
	private String nom;
	
	@Size(max = 255)
	@Column(name = "email")
	private String email;
	
	@ManyToOne
	@JoinColumn(name="id_role")
	private Role habilitation;

	public User(@Size(max = 100) String prenom, @Size(max = 100) String nom, @Size(max = 255) String email,
			Role habilitation) {
		super();
		this.prenom = prenom;
		this.nom = nom;
		this.email = email;
		this.habilitation = habilitation;
	}

	
	
	
}
