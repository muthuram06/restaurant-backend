package restaurantapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import restaurantapp.model.Order;
import restaurantapp.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    public List<Order> getUserOrders(String email) {

        return orderRepository.findByEmail(email);
    }

    public Optional<Order> getOrderById(Long id) {

        return orderRepository.findById(id);
    }
}