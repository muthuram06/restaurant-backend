package restaurantapp.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class RazorpayController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(
            @RequestParam int amount) {

        try {

            System.out.println("========== RAZORPAY DEBUG ==========");
            System.out.println("KEY ID: " + keyId);
            System.out.println("KEY SECRET: " + keySecret);
            System.out.println("AMOUNT: " + amount);
            System.out.println("===================================");

            if (amount <= 0) {
                return ResponseEntity
                        .badRequest()
                        .body("Amount must be greater than 0");
            }

            RazorpayClient razorpayClient =
                    new RazorpayClient(
                            keyId,
                            keySecret
                    );

            JSONObject options =
                    new JSONObject();

            options.put(
                    "amount",
                    amount * 100
            );

            options.put(
                    "currency",
                    "INR"
            );

            options.put(
                    "receipt",
                    "receipt_" +
                            System.currentTimeMillis()
            );

            Order order =
                    razorpayClient.orders.create(
                            options
                    );

            return ResponseEntity.ok(
                    new JSONObject(order.toString()).toMap()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Razorpay Error: "
                                    + e.getMessage()
                    );
        }
    }
}