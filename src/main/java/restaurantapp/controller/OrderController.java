package restaurantapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import restaurantapp.model.Order;
import restaurantapp.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public Order placeOrder(
            @RequestBody Order order) {

        return orderService.placeOrder(order);
    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }

    @PutMapping("/update-status/{id}")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return orderService
                .updateOrderStatus(id, status);
    }
}