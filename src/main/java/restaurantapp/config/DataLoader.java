package restaurantapp.config;

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
    public void run(String... args) {

        if (foodRepository.count() == 0) {

            foodRepository.save(
                new FoodItem(
                    "Paneer Butter Masala",
                    "North Indian",
                    220,
                    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
                )
            );

            foodRepository.save(
                new FoodItem(
                    "Masala Dosa",
                    "South Indian",
                    120,
                    "https://images.unsplash.com/photo-1589302168068-964664493dc0"
                )
            );

            foodRepository.save(
                new FoodItem(
                    "Veg Biryani",
                    "Fast Food",
                    180,
                    "https://images.unsplash.com/photo-1563379091339-03246963d29a"
                )
            );

            System.out.println("Foods inserted successfully!");
        }
    }
}