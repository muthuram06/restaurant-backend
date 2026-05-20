package restaurantapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import restaurantapp.model.FoodItem;
import restaurantapp.service.FoodItemService;

@RestController
@RequestMapping("/api/food")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @PostMapping("/add")
    public FoodItem addFood(
            @RequestBody FoodItem foodItem) {

        return foodItemService.addFood(foodItem);
    }

    @GetMapping("/all")
    public List<FoodItem> getAllFoods() {

        return foodItemService.getAllFoods();
    }
}