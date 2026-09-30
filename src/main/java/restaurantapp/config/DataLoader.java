package restaurantapp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import restaurantapp.model.FoodItem;
import restaurantapp.repository.FoodItemRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final FoodItemRepository foodRepository;

    public DataLoader(FoodItemRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {

        /*
         * If the database contains the old menu, replace it
         * automatically with the AFNA'S GARDEN menu.
         *
         * No manual PostgreSQL operation is required.
         */
        if (foodRepository.count() != 21) {

            System.out.println("==========================================");
            System.out.println("Replacing old menu with AFNA'S GARDEN menu...");
            System.out.println("==========================================");

            foodRepository.deleteAll();
            foodRepository.flush();

            loadMenu();

            System.out.println("==========================================");
            System.out.println("AFNA'S GARDEN RESTAURANT MENU LOADED!");
            System.out.println("Total food items: " + foodRepository.count());
            System.out.println("==========================================");

        } else {

            System.out.println("==========================================");
            System.out.println("AFNA'S GARDEN menu already exists.");
            System.out.println("Total food items: " + foodRepository.count());
            System.out.println("==========================================");
        }
    }

    private void loadMenu() {

        // ==========================
        // SOUTH INDIAN
        // ==========================

        foodRepository.save(new FoodItem(
                "Masala Dosa",
                "Crispy South Indian dosa served with chutney and sambar",
                120,
                "South Indian",
                "/images/Masala Dosa.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Dosa",
                "Traditional crispy South Indian dosa",
                90,
                "South Indian",
                "/images/Dosa.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Idli",
                "Soft steamed rice cakes served with chutney and sambar",
                60,
                "South Indian",
                "/images/Idli.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Medhu Vadai",
                "Crispy South Indian lentil fritters",
                70,
                "South Indian",
                "/images/Medhu Vadai.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Uthappam",
                "Soft and fluffy South Indian uthappam",
                110,
                "South Indian",
                "/images/Uthappam.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Poori",
                "Fluffy deep-fried Indian bread",
                80,
                "South Indian",
                "/images/Poori.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Phulka",
                "Soft Indian flatbread prepared fresh",
                50,
                "Indian Bread",
                "/images/Phulka.jpg"
        ));

        // ==========================
        // NORTH INDIAN
        // ==========================

        foodRepository.save(new FoodItem(
                "Paneer Butter Masala",
                "Creamy paneer cooked in rich tomato and butter gravy",
                220,
                "North Indian",
                "/images/Paneer Butter Masala.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Butter Naan",
                "Soft naan brushed with butter",
                70,
                "North Indian",
                "/images/Butter Naan.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Garlic Naan",
                "Soft naan topped with fresh garlic and herbs",
                90,
                "North Indian",
                "/images/Garlic Naan.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Peas Masala",
                "Delicious green peas cooked in a flavorful gravy",
                150,
                "North Indian",
                "/images/Peas Masala.jpg"
        ));

        // ==========================
        // RICE & MEALS
        // ==========================

        foodRepository.save(new FoodItem(
                "Veg Biriyani",
                "Aromatic vegetable biriyani prepared with fragrant rice and spices",
                180,
                "Rice",
                "/images/Veg Biriyani.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Veg Meals",
                "Complete vegetarian South Indian meals with traditional accompaniments",
                180,
                "Meals",
                "/images/Veg Meals.jpg"
        ));

        // ==========================
        // STREET FOOD
        // ==========================

        foodRepository.save(new FoodItem(
                "Pani Poori",
                "Crispy puris filled with spiced water and flavorful fillings",
                80,
                "Street Food",
                "/images/Pani Poori.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Pav Bhaji",
                "Mumbai-style spicy vegetable bhaji served with buttered pav",
                140,
                "Street Food",
                "/images/Pav Bhaji.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Samosa",
                "Crispy pastry filled with spiced vegetables",
                60,
                "Street Food",
                "/images/Samosa.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Veg Cutlet",
                "Crispy vegetable cutlet served with fresh chutney",
                80,
                "Street Food",
                "/images/Veg Cutlet.jpg"
        ));

        // ==========================
        // NOODLES
        // ==========================

        foodRepository.save(new FoodItem(
                "Veg Noodles",
                "Stir-fried vegetable noodles with fresh vegetables",
                160,
                "Chinese",
                "/images/Veg Noodles.jpg"
        ));

        // ==========================
        // BEVERAGES
        // ==========================

        foodRepository.save(new FoodItem(
                "Coffee",
                "Freshly brewed hot coffee",
                50,
                "Beverages",
                "/images/Coffee.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Tea",
                "Refreshing hot Indian tea",
                40,
                "Beverages",
                "/images/Tea.jpg"
        ));

        foodRepository.save(new FoodItem(
                "Lemon Tea",
                "Refreshing lemon-infused tea",
                50,
                "Beverages",
                "/images/Lemon Tea.jpg"
        ));
    }
}