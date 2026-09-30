package restaurantapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import restaurantapp.model.FoodItem;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

    Optional<FoodItem> findByName(String name);
}