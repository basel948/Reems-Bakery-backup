package com.bluetech.shopNgo.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service
public class StorageService {

    @Value("${storage.location}")
    private String storageLocation;

    public String store(MultipartFile file) {
        System.out.println("in the TOP OF StorageService SERVICE");

        try {
            // Ensure the storage directory exists
            Path directory = Paths.get(storageLocation);
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }

            // Extract file extension
            String originalFileName = file.getOriginalFilename();
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

            // Generate a unique filename with UUID and timestamp
            String uniqueID = UUID.randomUUID().toString();
            String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
            String storedFileName = uniqueID + "_" + timestamp + fileExtension;

            // Define the file storage location
            Path location = directory.resolve(storedFileName);
            System.out.println("Location: " + location.toString());

            // Copy the file to the target location
            Files.copy(file.getInputStream(), location, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("in the BOTTOM OF StorageService SERVICE");

            return storedFileName;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to store the file: " + e.getMessage());
        }
    }
}




