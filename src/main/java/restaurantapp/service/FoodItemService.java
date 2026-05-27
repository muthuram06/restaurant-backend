package restaurantapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import restaurantapp.model.FoodItem;
import restaurantapp.repository.FoodItemRepository;

import java.util.List;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public List<FoodItem> getAllFoods() {
        return foodItemRepository.findAll();
    }

    public FoodItem addFood(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }
}