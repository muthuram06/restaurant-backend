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

    foodRepository.save(new FoodItem(
        "Paneer Butter Masala",
        "North Indian",
        220,
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Masala Dosa",
        "South Indian",
        120,
        "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Veg Biryani",
        "Rice",
        180,
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Idli",
        "South Indian",
        60,
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Medu Vada",
        "South Indian",
        70,
        "https://images.unsplash.com/photo-1626508035297-0cd27c397d1f?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Pongal",
        "South Indian",
        90,
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Poori Masala",
        "South Indian",
        110,
        "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Rava Dosa",
        "South Indian",
        130,
        "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Onion Uttapam",
        "South Indian",
        140,
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Gobi Manchurian",
        "Chinese",
        160,
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Veg Fried Rice",
        "Chinese",
        170,
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Veg Noodles",
        "Chinese",
        160,
        "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Chilli Paneer",
        "Chinese",
        190,
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Pav Bhaji",
        "Street Food",
        140,
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Veg Burger",
        "Fast Food",
        120,
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800"
    ));

    foodRepository.save(new FoodItem(
        "French Fries",
        "Fast Food",
        100,
        "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Veg Pizza",
        "Italian",
        250,
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Mushroom Biryani",
        "Rice",
        220,
        "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Curd Rice",
        "Rice",
        90,
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Lemon Rice",
        "Rice",
        100,
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Gulab Jamun",
        "Dessert",
        80,
        "https://images.unsplash.com/photo-1605197161470-5f7d54a8f8c4?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Falooda",
        "Dessert",
        120,
        "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800"
    ));

    foodRepository.save(new FoodItem(
        "Vanilla Ice Cream",
        "Dessert",
        90,
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800"
    ));

    System.out.println("Vegetarian restaurant menu loaded successfully!");

    }
}