package com.bluetech.shopNgo.Service;

import com.bluetech.shopNgo.Models.Item;
import com.bluetech.shopNgo.Models.OrderRequest;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import java.net.URI;
import org.json.JSONObject;

@Service
public class PayPalService {


    // here we create 3 variables and give them the values from the path paypal.client.(id,secret,url)
    @Value("${paypal.client.id}")
    private String clientId;

    @Value("${paypal.client.secret}")
    private String clientSecret;

    @Value("${paypal.api.base.url}")
    private String baseUrl;


    private final HttpClient httpClient = HttpClient.newHttpClient();

    public String createOrder(OrderRequest orderRequest) throws Exception {
        System.out.println("Top of CreateOrder Service");

        String accessToken = generateAccessToken();
        System.out.println("Access Token: " + accessToken);

        JSONArray purchaseUnitsArray = new JSONArray();
        JSONObject amountBreakdown = new JSONObject();
        double totalItemCost = 0;

        JSONArray itemsArray = new JSONArray();
        for (Item item : orderRequest.getItems()) {
            double itemCost = Double.parseDouble(item.getCost());
            int quantity = item.getQuantity();

            // Calculate total item cost
            totalItemCost += itemCost * quantity;

            itemsArray.put(new JSONObject()
                    .put("name", item.getName())
                    .put("unit_amount", new JSONObject()
                            .put("currency_code", "ILS") // Ensure currency code matches with your setting
                            .put("value", itemCost)
                    )
                    .put("quantity", quantity)
            );
        }

        // Ensure that the total price in the request matches the sum of individual item costs
        if (totalItemCost != Double.parseDouble(orderRequest.getTotalPrice())) {
            throw new Exception("Total price mismatch");
        }

        amountBreakdown.put("item_total", new JSONObject()
                .put("currency_code", "ILS") // Ensure currency code matches with your setting
                .put("value", totalItemCost)
        );

        JSONObject purchaseUnit = new JSONObject();
        purchaseUnit.put("amount", new JSONObject()
                .put("currency_code", "ILS") // Ensure currency code matches with your setting
                .put("value", orderRequest.getTotalPrice())
                .put("breakdown", amountBreakdown)
        );
        purchaseUnit.put("items", itemsArray);

        purchaseUnitsArray.put(purchaseUnit);

        JSONObject requestBodyJson = new JSONObject()
                .put("intent", "CAPTURE")
                .put("purchase_units", purchaseUnitsArray);

        String requestBodyString = requestBodyJson.toString();
        System.out.println("Request Body: " + requestBodyString);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/v2/checkout/orders"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + accessToken)
                .POST(HttpRequest.BodyPublishers.ofString(requestBodyString))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response: " + response);
        System.out.println("Response Status Code: " + response.statusCode());

        System.out.println("Bottom of CreateOrder Service");
        return handleResponse(response);
    }

    public String capturePayment(String orderId) throws Exception {
        String accessToken = generateAccessToken();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/v2/checkout/orders/" + orderId + "/capture"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + accessToken)
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        return handleResponse(response);
    }

    private String generateAccessToken() throws Exception {
        System.out.println("Top of generateAccessToken Service");
        String auth = Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes());
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/v1/oauth2/token"))
                .header("Authorization", "Basic " + auth)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString("grant_type=client_credentials"))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        JSONObject json = new JSONObject(response.body());
        System.out.println(response.body());
        System.out.println("Bottom of generateAccessToken Service");
        return json.getString("access_token");
    }

    private String handleResponse(HttpResponse<String> response) throws Exception {
        System.out.println("Top of handleResponse Service");
        System.out.println(response);
        System.out.println(response.statusCode());
        if (response.statusCode() == 200 || response.statusCode() == 201) {
            System.out.println("Response Body: " + response.body());
            System.out.println("Bottom of handlerResponse Service");
            return response.body();
        } else {
            System.out.println("Response Body on Error: " + response.body()); // Log the complete response body
            throw new Exception("PayPal API request failed with status: " + response.statusCode());
        }
    }
}

