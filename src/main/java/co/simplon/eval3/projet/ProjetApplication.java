package co.simplon.eval3.projet;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import co.simplon.eval3.projet.model.Role;
import co.simplon.eval3.projet.model.User;
import co.simplon.eval3.projet.repository.RoleRepository;
import co.simplon.eval3.projet.repository.UserRepository;

@SpringBootApplication
public class ProjetApplication implements CommandLineRunner{
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@PersistenceContext
	private EntityManager em;

	public static void main(String[] args) {
		SpringApplication.run(ProjetApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		

		//Creation user
		List<Role> roles = roleRepository.findAll();
		Role admin = roles.get(0);
		Role user = roles.get(1);
		User u1 = new User("toto", "test", "ooo@mm.p", admin);
		User u2 = new User("test1", "toto", "aaa@mm.p", user);
		
		userRepository.save(u1);
		userRepository.save(u2);
		
	}
}
