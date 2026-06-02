package restaurantapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import restaurantapp.model.Review;
import restaurantapp.repository.ReviewRepository;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping
    public Review saveReview(
        @RequestBody Review review
    ) {

        return reviewRepository.save(review);
    }

    @GetMapping
    public List<Review> getAllReviews() {

        return reviewRepository.findAll();
    }

    @GetMapping("/{foodName}")
    public List<Review> getFoodReviews(
        @PathVariable String foodName
    ) {

        return reviewRepository.findByFoodName(
            foodName
        );
    }
}