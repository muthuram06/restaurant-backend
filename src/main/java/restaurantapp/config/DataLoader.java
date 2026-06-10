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
                "Creamy paneer curry cooked with rich tomato gravy",
                220,
                "North Indian",
                "https://images.unsplash.com/photo-1631452180539-96aca7d48617"
        ));

        foodRepository.save(new FoodItem(
                "Masala Dosa",
                "Crispy dosa served with potato masala",
                120,
                "South Indian",
                "https://images.unsplash.com/photo-1668236543090-82eba5ee5976"
        ));

        foodRepository.save(new FoodItem(
                "Veg Biryani",
                "Aromatic basmati rice cooked with vegetables",
                180,
                "Rice",
                "https://images.unsplash.com/photo-1701579231349-d7459c40919d"
        ));

        foodRepository.save(new FoodItem(
                "Idli",
                "Soft steamed rice cakes with chutney",
                60,
                "South Indian",
                "https://images.unsplash.com/photo-1589301760014-d929f3979dbc"
        ));

        foodRepository.save(new FoodItem(
                "Medu Vada",
                "Crispy lentil doughnuts",
                70,
                "South Indian",
                "https://images.unsplash.com/photo-1626508035297-0cd27c397d1f"
        ));

        foodRepository.save(new FoodItem(
                "Pongal",
                "Traditional South Indian rice dish",
                90,
                "South Indian",
                "https://images.unsplash.com/photo-1631452180519-c014fe946bc7"
        ));

        foodRepository.save(new FoodItem(
                "Poori Masala",
                "Fluffy poori served with potato masala",
                110,
                "South Indian",
                "https://images.unsplash.com/photo-1626132647523-66f5bf380027"
        ));

        foodRepository.save(new FoodItem(
                "Rava Dosa",
                "Thin crispy semolina dosa",
                130,
                "South Indian",
                "https://images.unsplash.com/photo-1630383249896-424e482df921"
        ));

        foodRepository.save(new FoodItem(
                "Onion Uttapam",
                "Soft uttapam topped with onions",
                140,
                "South Indian",
                "https://images.unsplash.com/photo-1589301760014-d929f3979dbc"
        ));

        foodRepository.save(new FoodItem(
                "Gobi Manchurian",
                "Spicy cauliflower starter",
                160,
                "Chinese",
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d"
        ));

        foodRepository.save(new FoodItem(
                "Veg Fried Rice",
                "Chinese style vegetable fried rice",
                170,
                "Chinese",
                "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
        ));

        foodRepository.save(new FoodItem(
                "Veg Noodles",
                "Vegetable hakka noodles",
                160,
                "Chinese",
                "https://images.unsplash.com/photo-1617093727343-374698b1b08d"
        ));

        foodRepository.save(new FoodItem(
                "Chilli Paneer",
                "Paneer tossed with spicy sauces",
                190,
                "Chinese",
                "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"
        ));

        foodRepository.save(new FoodItem(
                "Pav Bhaji",
                "Mumbai style spicy vegetable mash",
                140,
                "Street Food",
                "https://images.unsplash.com/photo-1601050690597-df0568f70950"
        ));

        foodRepository.save(new FoodItem(
                "Veg Burger",
                "Loaded vegetable burger",
                120,
                "Fast Food",
                "https://images.unsplash.com/photo-1550547660-d9450f859349"
        ));

        foodRepository.save(new FoodItem(
                "French Fries",
                "Crispy golden fries",
                100,
                "Fast Food",
                "https://images.unsplash.com/photo-1576107232684-1279f390859f"
        ));

        foodRepository.save(new FoodItem(
                "Veg Pizza",
                "Cheesy vegetable pizza",
                250,
                "Italian",
                "https://images.unsplash.com/photo-1513104890138-7c749659a591"
        ));

        foodRepository.save(new FoodItem(
                "Mushroom Biryani",
                "Flavorful mushroom biryani",
                220,
                "Rice",
                "https://images.unsplash.com/photo-1633945274405-b6c8069047b0"
        ));

        foodRepository.save(new FoodItem(
                "Curd Rice",
                "Traditional curd rice",
                90,
                "Rice",
                "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
        ));

        foodRepository.save(new FoodItem(
                "Lemon Rice",
                "Tangy lemon flavored rice",
                100,
                "Rice",
                "https://images.unsplash.com/photo-1512058564366-18510be2db19"
        ));

        foodRepository.save(new FoodItem(
                "Gulab Jamun",
                "Soft milk sweet dessert",
                80,
                "Dessert",
                "https://images.unsplash.com/photo-1605197161470-5f7d54a8f8c4"
        ));

        foodRepository.save(new FoodItem(
                "Falooda",
                "Popular rose milk dessert",
                120,
                "Dessert",
                "https://images.unsplash.com/photo-1579954115545-a95591f28bfc"
        ));

        foodRepository.save(new FoodItem(
                "Vanilla Ice Cream",
                "Classic vanilla ice cream",
                90,
                "Dessert",
                "https://images.unsplash.com/photo-1563805042-7684c019e1cb"
        ));

        System.out.println("Vegetarian restaurant menu loaded successfully!");
    }
}