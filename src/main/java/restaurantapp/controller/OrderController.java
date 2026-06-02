package restaurantapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import restaurantapp.model.Order;
import restaurantapp.repository.OrderRepository;
import restaurantapp.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public Order saveOrder(
            @RequestBody Order order) {

        if (order.getStatus() == null ||
            order.getStatus().isEmpty()) {

            order.setStatus("Preparing");
        }

        return orderService.saveOrder(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }

    @GetMapping("/user/{email}")
    public List<Order> getUserOrders(
            @PathVariable String email) {

        return orderService.getUserOrders(email);
    }

    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable Long id) {

        Optional<Order> order =
                orderService.getOrderById(id);

        return order.orElse(null);
    }

    @PutMapping("/{id}")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Optional<Order> optionalOrder =
                orderService.getOrderById(id);

        if (optionalOrder.isPresent()) {

            Order order = optionalOrder.get();

            order.setStatus(status);

            return orderRepository.save(order);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(
            @PathVariable Long id) {

        orderRepository.deleteById(id);
    }
}