package restaurantapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "table_booking")
public class TableBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private String email;

    private String phone;

    private int persons;

    private String bookingDate;

    private String bookingTime;

    public TableBooking() {
    }

    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(
            String customerName) {
        this.customerName = customerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(
            String phone) {
        this.phone = phone;
    }

    public int getPersons() {
        return persons;
    }

    public void setPersons(
            int persons) {
        this.persons = persons;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(
            String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(
            String bookingTime) {
        this.bookingTime = bookingTime;
    }
}