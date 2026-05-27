package restaurantapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import restaurantapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findByEmailAndPassword(String email, String password);

}