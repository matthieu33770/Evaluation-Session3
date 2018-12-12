package co.simplon.eval3.projet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.simplon.eval3.projet.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
