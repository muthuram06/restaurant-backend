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
    public ResponseEntity<?> createOrder(@RequestParam int amount) {

        try {

            System.out.println("=================================");
            System.out.println("PAYMENT API CALLED");
            System.out.println("Amount = " + amount);
            System.out.println("Key ID = " + keyId);
            System.out.println("=================================");

            if (amount <= 0) {
                return ResponseEntity.badRequest()
                        .body("Invalid amount");
            }

            RazorpayClient client =
                    new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest =
                    new JSONObject();

            orderRequest.put(
                    "amount",
                    amount * 100
            );

            orderRequest.put(
                    "currency",
                    "INR"
            );

            orderRequest.put(
                    "receipt",
                    "receipt_" + System.currentTimeMillis()
            );

            Order order =
                    client.orders.create(orderRequest);

            return ResponseEntity.ok(
                    new JSONObject(order.toString()).toMap()
            );

        } catch (Exception e) {

            System.out.println("ERROR OCCURRED");
            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body("Razorpay Error : " + e.getMessage());
        }
    }
}