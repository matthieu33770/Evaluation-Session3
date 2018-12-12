package co.simplon.eval3.projet;

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

	public static void main(String[] args) {
		SpringApplication.run(ProjetApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		//mise à zero des tables
		//userRepository.deleteAllInBatch();
		//roleRepository.deleteAllInBatch();

		
		//Cretion role
		Role r1 = new Role("tech");
		//Creation user
		User u1 = new User("toto", "test", "ooo@mm.p", r1);
		
		roleRepository.save(r1);
		userRepository.save(u1);
	}
}
