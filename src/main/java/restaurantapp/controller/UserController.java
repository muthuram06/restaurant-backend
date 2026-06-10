package restaurantapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import restaurantapp.model.User;
import restaurantapp.repository.UserRepository;
import restaurantapp.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(
            @RequestBody User user) {

        User existingUser =
                userRepository.findByEmail(
                        user.getEmail());

        if (existingUser != null) {
            return existingUser;
        }

        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User loginUser(
            @RequestBody User user) {

        return userService.loginUser(
                user.getEmail(),
                user.getPassword());
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
}