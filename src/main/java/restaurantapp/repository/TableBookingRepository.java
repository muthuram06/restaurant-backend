package restaurantapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import restaurantapp.model.TableBooking;

public interface TableBookingRepository
        extends JpaRepository<TableBooking, Long> {
}