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

        if (order.getPaymentStatus() == null ||
                order.getPaymentStatus().isEmpty()) {

            order.setPaymentStatus("Pending");
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

        return orderRepository.findByEmail(email);
    }

    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable Long id) {

        Optional<Order> order =
                orderService.getOrderById(id);

        return order.orElse(null);
    }

    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(
            @PathVariable String status) {

        return orderRepository.findByStatus(status);
    }

    @PutMapping("/{id}")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Optional<Order> optionalOrder =
                orderRepository.findById(id);

        if (optionalOrder.isPresent()) {

            Order order =
                    optionalOrder.get();

            order.setStatus(status);

            return orderRepository.save(order);
        }

        return null;
    }

    @PutMapping("/payment/{id}")
    public Order updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam String paymentStatus) {

        Optional<Order> optionalOrder =
                orderRepository.findById(id);

        if (optionalOrder.isPresent()) {

            Order order =
                    optionalOrder.get();

            order.setPaymentStatus(
                    paymentStatus);

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