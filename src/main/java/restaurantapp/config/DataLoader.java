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

        foodRepository.deleteAll();

        foodRepository.save(
            new FoodItem(
                "Paneer Butter Masala",
                "North Indian",
                220,
                "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800"
            )
        );

        foodRepository.save(
            new FoodItem(
                "Masala Dosa",
                "South Indian",
                120,
                "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800"
            )
        );

        foodRepository.save(
            new FoodItem(
                "Veg Biryani",
                "Fast Food",
                180,
                "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800"
            )
        );

        foodRepository.save(
            new FoodItem(
                "Gobi Manchurian",
                "Chinese",
                160,
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800"
            )
        );

        foodRepository.save(
            new FoodItem(
                "Veg Fried Rice",
                "Chinese",
                170,
                "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800"
            )
        );

        foodRepository.save(
            new FoodItem(
                "Pav Bhaji",
                "Street Food",
                140,
                "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800"
            )
        );

        System.out.println("Foods inserted successfully!");
    }
}