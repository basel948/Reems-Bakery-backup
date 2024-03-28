package com.bluetech.shopNgo.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class StorageService {

    @Value("${storage.location}")
    private String storageLocation;

    public String store(MultipartFile file) {
        System.out.println("in the TOP OF StorageService SERVICE");

        try {

            Path directory = Paths.get(storageLocation);
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }

            String originalFileName = file.getOriginalFilename();
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            String storedFileName = UUID.randomUUID().toString() + fileExtension;

//            System.out.println("Original File Name: " + originalFileName);
//            System.out.println("File Extension: " + fileExtension);
//            System.out.println("Stored File Name: " + storedFileName);

            Path location = Paths.get(storageLocation + "/" + storedFileName);
            System.out.println("Location: " + location.toString());

            Files.copy(file.getInputStream(), location);
            System.out.println("in the BOTTOM OF StorageService SERVICE");

            return storedFileName;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to store the file.");
        }
    }
}




