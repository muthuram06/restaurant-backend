package restaurantapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import restaurantapp.model.Order;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

}