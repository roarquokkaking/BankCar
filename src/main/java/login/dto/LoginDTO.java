package login.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
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
    private String imageUrl;

    @Column(name="profile_image")
    private String profile_image;


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

    public boolean isDriver() {
        return driver;
    }

    public void setDriver(boolean driver) {
        this.driver = driver;
    }

    public String getProfile_image() {
        return profile_image;
    }

    public void setProfile_image(String profile_image) {
        this.profile_image = profile_image;
    }

    @Column(name = "phone_number" ,nullable = true)
    private String phone_number;// 전화번호
    @Column(name = " create_date",nullable = true)
    private LocalDateTime create_date ;// 가입 날짜
    @Column(name = "rating",nullable = true)
    private Float rating ; //매너 온도
    @Column(name ="image_file_name",nullable = true)
    private String image_file_name; // 클라우드 이미지 uuid
    @Column(name ="image_original_name",nullable = true)
    private String image_original_name ; //이미지 실제 이름

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private List<BookingEntity>BookingEntity;



    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public LocalDateTime getCreate_date() {
        return create_date;
    }

    public void setCreate_date(LocalDateTime create_date) {
        this.create_date = create_date;
    }


    public void setRating(Float rating) {
        this.rating = rating;
    }

    public String getImage_file_name() {
        return image_file_name;
    }

    public void setImage_file_name(String image_file_name) {
        this.image_file_name = image_file_name;
    }

    public String getImage_original_name() {
        return image_original_name;
    }

    public void setImage_original_name(String image_original_name) {
        this.image_original_name = image_original_name;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public float getRating() {
        return (rating != null) ? rating : 0.0f;
    }


}
