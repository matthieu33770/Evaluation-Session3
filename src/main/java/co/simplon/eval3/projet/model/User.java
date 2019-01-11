package co.simplon.eval3.projet.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.springframework.cache.annotation.EnableCaching;

import java.io.Serializable;

@Entity
@Table(name = "users")
@EnableCaching()
public class User implements Serializable {

	// default serial
	private static final long serialVersionUID = 1L;

	public User() {
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
	
	@ManyToOne(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
	@JoinColumn(name="id_role")
	private Role habilitation;

	public User(@Size(max = 100) String prenom, @Size(max = 100) String nom, @Size(max = 255) String email,
			Role habilitation) {
		this.prenom = prenom;
		this.nom = nom;
		this.email = email;
		this.habilitation = habilitation;
	}

	public String getNom() {
		return this.nom;
	};
	public String getPrenom(){
		return this.prenom;
	};

	public String getEmail() {
		return this.email;
	};

	public Role getHabilitation() {
		return this.habilitation;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setHabilitation(Role habilitation) {
		this.habilitation = habilitation;
	}

	public long getId() {
		return id;
	};

}
