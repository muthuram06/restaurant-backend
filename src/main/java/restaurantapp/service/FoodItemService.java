package restaurantapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import restaurantapp.model.FoodItem;
import restaurantapp.repository.FoodItemRepository;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public FoodItem addFood(FoodItem foodItem) {

        return foodItemRepository.save(foodItem);
    }

    public List<FoodItem> getAllFoods() {

        return foodItemRepository.findAll();
    }
}