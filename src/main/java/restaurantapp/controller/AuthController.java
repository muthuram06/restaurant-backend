package restaurantapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import restaurantapp.model.User;
import restaurantapp.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(
            @RequestBody User user) {

        User existingUser =
                userRepository.findByEmail(
                        user.getEmail());

        if (existingUser != null) {

            throw new RuntimeException(
                    "User already exists with email: "
                            + user.getEmail());
        }

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User loginUser(
            @RequestBody User user) {

        User existingUser =
                userRepository.findByEmailAndPassword(
                        user.getEmail(),
                        user.getPassword());

        if (existingUser == null) {

            throw new RuntimeException(
                    "Invalid Email or Password");
        }

        return existingUser;
    }

    @PostMapping("/google")
    public User googleLogin(
            @RequestBody User user) {

        User existingUser =
                userRepository.findByEmail(
                        user.getEmail());

        if (existingUser != null) {
            return existingUser;
        }

        return userRepository.save(user);
    }

    @GetMapping("/users")
    public Iterable<User> getAllUsers() {

        return userRepository.findAll();
    }
}