package payment.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "payment")
public class KakaoPayEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="seq")
    private Long seq;

    @Column(name="id")
    private String id;

    @Column(name="cid")
    private String cid;
    @Column(name="tid")
    private String tid;
    @Column(name="partner_order_id")
    private String partner_order_id;
    @Column(name="partner_user_id")
    private String partner_user_id;
    @Column(name="item_name")
    private String item_name;
    @Column(name="quantity")
    private String quantity;
    @Column(name="total_amount")
    private String total_amount;
    @Column(name="vat_amount")
    private String vat_amount;
    @Column(name="tax_free_amount")
    private String tax_free_amount;
    @Column(name="approval_url")
    private String approval_url;
    @Column(name="fail_url")
    private String fail_url;
    @Column(name="cancel_url")
    private String cancel_url;

    @Column(name="status")
    private int status;
    @Column(name="car_id")
    private Long car_id;


    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getPartner_order_id() {
        return partner_order_id;
    }

    public void setPartner_order_id(String partner_order_id) {
        this.partner_order_id = partner_order_id;
    }

    public String getPartner_user_id() {
        return partner_user_id;
    }

    public void setPartner_user_id(String partner_user_id) {
        this.partner_user_id = partner_user_id;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(String total_amount) {
        this.total_amount = total_amount;
    }

    public String getVat_amount() {
        return vat_amount;
    }

    public void setVat_amount(String vat_amount) {
        this.vat_amount = vat_amount;
    }

    public String getTax_free_amount() {
        return tax_free_amount;
    }

    public void setTax_free_amount(String tax_free_amount) {
        this.tax_free_amount = tax_free_amount;
    }

    public String getApproval_url() {
        return approval_url;
    }

    public void setApproval_url(String approval_url) {
        this.approval_url = approval_url;
    }

    public String getFail_url() {
        return fail_url;
    }

    public void setFail_url(String fail_url) {
        this.fail_url = fail_url;
    }

    public String getCancel_url() {
        return cancel_url;
    }

    public void setCancel_url(String cancel_url) {
        this.cancel_url = cancel_url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Long getCar_id() {
        return car_id;
    }

    public void setCar_id(Long car_id) {
        this.car_id = car_id;
    }
}
