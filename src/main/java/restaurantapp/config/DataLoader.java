package restaurantapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import restaurantapp.model.FoodItem;
import restaurantapp.repository.FoodItemRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final FoodItemRepository foodRepository;

    public DataLoader(FoodItemRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (foodRepository.count() == 0) {

            foodRepository.save(
                new FoodItem(
                    "Chicken Biryani",
                    "Best spicy biryani",
                    250,
                    "https://images.unsplash.com/photo-1563379091339-03246963d29a"
                )
            );

            foodRepository.save(
                new FoodItem(
                    "Fish Fry",
                    "Crispy fried fish",
                    180,
                    "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62"
                )
            );

            foodRepository.save(
                new FoodItem(
                    "Paneer Butter Masala",
                    "Creamy paneer curry",
                    220,
                    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7"
                )
            );

            System.out.println("Foods inserted successfully!");

        }
    }
}