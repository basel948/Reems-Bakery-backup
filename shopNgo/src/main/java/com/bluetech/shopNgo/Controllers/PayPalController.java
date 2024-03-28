package com.bluetech.shopNgo.Controllers;


import com.bluetech.shopNgo.Models.CaptureRequest;
import com.bluetech.shopNgo.Models.OrderRequest;
import com.bluetech.shopNgo.Service.PayPalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/paypal")
public class PayPalController {

    private final PayPalService payPalService;

    @Autowired
    public PayPalController(PayPalService payPalService) {
        this.payPalService = payPalService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequest orderRequest) {
        System.out.println("Top of CreateOder Controller");
        try {
            System.out.println(orderRequest.toString());
            String order = payPalService.createOrder(orderRequest);
            System.out.println("Bottom of CreateOder Controller");
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating PayPal order: " + e.getMessage());
        }
    }

    @PostMapping("/capture-order")
    public ResponseEntity<String> captureOrder(@RequestBody CaptureRequest captureRequest) {
        try {
            String captureData = payPalService.capturePayment(captureRequest.getOrderId());
            return ResponseEntity.ok(captureData);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error capturing PayPal payment: " + e.getMessage());
        }
    }
}
