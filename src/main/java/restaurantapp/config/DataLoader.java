package com.restaurantapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final FoodRepository foodRepository;

    public DataLoader(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if(foodRepository.count() == 0) {

            foodRepository.save(
                new Food(
                    "Chicken Biryani",
                    "Best spicy biryani",
                    250,
                    "https://images.unsplash.com/photo-1563379091339-03246963d29a"
                )
            );

            foodRepository.save(
                new Food(
                    "Fish Fry",
                    "Crispy fried fish",
                    180,
                    "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62"
                )
            );

            foodRepository.save(
                new Food(
                    "Paneer Butter Masala",
                    "Creamy paneer curry",
                    220,
                    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7"
                )
            );

        }
    }
}
