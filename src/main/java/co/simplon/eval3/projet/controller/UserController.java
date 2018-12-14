package co.simplon.eval3.projet.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import co.simplon.eval3.projet.model.Role;
import co.simplon.eval3.projet.model.User;
import co.simplon.eval3.projet.repository.RoleRepository;
import co.simplon.eval3.projet.repository.UserRepository;

/**
 * UserController
 */
@RestController
@RequestMapping("/home")
public class UserController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private RoleRepository roleRepo;

    @GetMapping("/{nom}")
    public ResponseEntity<?> findOneByName(@PathVariable String nom) {

        List<User> userOne = null;
        userOne = userRepo.findBynom(nom);
        return ResponseEntity.status(HttpStatus.CREATED).body(userOne);
    }

    @RequestMapping(value = "/isAdmin", method = RequestMethod.GET)
    public ResponseEntity<?> allUser() {
        List<User> listeUsers = null;

        try {
        	listeUsers = userRepo.findAll();
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(listeUsers);
    }

    @PostMapping(value = "/emailLog/{email}")
    public ResponseEntity<?> isExisting(@PathVariable String email) {

        List<User> users = null;
        List<Role> role = null;
        role = roleRepo.findAll();
        users = userRepo.findByemail(email);
        if (users.size() <= 0) {
            System.out.println("error: email don't exist");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(users);

    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user) {
        System.out.println("etape1" + user);
        User incomingUser = null ;
        String nom = user.getNom();
        String prenom = user.getPrenom();   
        String email = user.getEmail();
        Role habilitation = user.getHabilitation();
         try{
            incomingUser = userRepo.saveAndFlush(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(incomingUser);

    }

}