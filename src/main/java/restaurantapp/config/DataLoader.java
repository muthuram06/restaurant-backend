package restaurantapp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import restaurantapp.model.FoodItem;
import restaurantapp.repository.FoodItemRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(FoodItemRepository repository) {
        return args -> {

            repository.save(new FoodItem(
                    "Paneer Butter Masala",
                    "North Indian",
                    220,
                    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
            ));

            repository.save(new FoodItem(
                    "Masala Dosa",
                    "South Indian",
                    120,
                    "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
            ));

            repository.save(new FoodItem(
                    "Veg Biryani",
                    "Fast Food",
                    180,
                    "https://images.unsplash.com/photo-1563379091339-03246963d29a"
            ));
        };
    }
}