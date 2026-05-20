package restaurantapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import restaurantapp.model.Order;
import restaurantapp.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Order order) {

        order.setStatus("ORDER PLACED");

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    public Order updateOrderStatus(
            Long id,
            String status) {

        Order order =
                orderRepository.findById(id).orElse(null);

        if (order != null) {

            order.setStatus(status);

            return orderRepository.save(order);
        }

        return null;
    }
}