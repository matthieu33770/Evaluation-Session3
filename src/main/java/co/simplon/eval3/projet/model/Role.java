package co.simplon.eval3.projet.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "role")
public class Role implements Serializable{

	//default serial
	private static final long serialVersionUID = 1L;
	
	public Role() {
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id_role")
	private long idRole;
	
	@Size(max = 50)
	@Column(name="fonction")
	private String fonction;

	public Role(@Size(max = 50) String fonction) {
		super();
		this.fonction = fonction;
	}	
	
}
