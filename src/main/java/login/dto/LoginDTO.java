package login.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="user")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginDTO {
    @Id
    @Column(name="id")
    private String id;
    @Column(name="email")
    private String email;
    @Column(name="name")
    private String name;
    @Column(name="driver")
    private boolean driver;

    public boolean isDriver() {
        return driver;
    }

    public void setDriver(boolean driver) {
        this.driver = driver;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
