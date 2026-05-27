package restaurantapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import restaurantapp.model.User;
import restaurantapp.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(
            @RequestBody User user
    ) {

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User loginUser(
            @RequestBody User user
    ) {

        return userRepository
                .findByEmailAndPassword(
                        user.getEmail(),
                        user.getPassword()
                );
    }
}