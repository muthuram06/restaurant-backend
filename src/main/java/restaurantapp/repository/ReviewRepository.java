package restaurantapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import restaurantapp.model.Review;

public interface ReviewRepository
extends JpaRepository<Review, Long> {

    List<Review> findByFoodName(
        String foodName
    );
}