package co.simplon.eval3.projet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import co.simplon.eval3.projet.model.User;
import co.simplon.eval3.projet.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class ProjetController {
	
	@Autowired
	private UserRepository userRepository;
	
	public ProjetController() {}
	
	/**
	 * Return tous les users
	 * @return
	 */
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUsers(){
		List<User> listeUsers = null;
		try {
		listeUsers = userRepository.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(listeUsers);
	}
}
