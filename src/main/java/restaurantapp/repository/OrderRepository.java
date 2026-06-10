package restaurantapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import restaurantapp.model.Order;

@Repository
public interface OrderRepository
        extends JpaRepository<Order, Long> {

    List<Order> findByEmail(String email);

    List<Order> findByUserEmail(String userEmail);

    List<Order> findByStatus(String status);

    List<Order> findByPaymentMethod(String paymentMethod);

    List<Order> findByPaymentStatus(String paymentStatus);

    List<Order> findByOrderTrackingId(String orderTrackingId);

    List<Order> findByCustomerNameContainingIgnoreCase(
            String customerName);

    long countByStatus(String status);
}