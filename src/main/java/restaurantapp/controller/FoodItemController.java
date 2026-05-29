package restaurantapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import restaurantapp.model.FoodItem;
import restaurantapp.service.FoodItemService;

import java.util.List;

@RestController
@RequestMapping("/api/food")
@CrossOrigin(origins = "*")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @GetMapping("/all")
    public List<FoodItem> getAllFoods() {
        return foodItemService.getAllFoods();
    }

    @PostMapping("/add")
    public FoodItem addFood(@RequestBody FoodItem foodItem) {
        return foodItemService.addFood(foodItem);
    }
}