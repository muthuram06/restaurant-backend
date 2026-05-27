package restaurantapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import restaurantapp.model.FoodItem;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

}