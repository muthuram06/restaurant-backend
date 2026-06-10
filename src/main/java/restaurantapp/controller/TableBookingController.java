package restaurantapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import restaurantapp.model.TableBooking;
import restaurantapp.repository.TableBookingRepository;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class TableBookingController {

    @Autowired
    private TableBookingRepository repository;

    @PostMapping
    public TableBooking createBooking(
            @RequestBody TableBooking booking) {

        return repository.save(booking);
    }

    @GetMapping
    public List<TableBooking> getBookings() {

        return repository.findAll();
    }
}