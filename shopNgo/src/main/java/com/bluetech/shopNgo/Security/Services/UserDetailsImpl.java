// Package declaration
package com.bluetech.shopNgo.Security.Services;

// Import statements
import com.bluetech.shopNgo.Models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

// Class declaration implementing UserDetails interface for Spring Security
public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L; // For serialization

    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private Double latitude;
    private Double longitude;
    private String city;
    private String address;
    private String moreInfo;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    // Constructor
    public UserDetailsImpl(Long id, String username, String email, String password, String phoneNumber,
                           Double latitude, Double longitude, String city, String address, String moreInfo,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.address = address;
        this.moreInfo = moreInfo;
        this.authorities = authorities;
    }


    // Static method to create UserDetailsImpl from a User entity
    public static UserDetailsImpl build(User user) {
        // Converts roles to Spring Security authorities
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        // Returns a new instance of UserDetailsImpl
        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getPhoneNumber(),
                user.getLocation().getLatitude(),
                user.getLocation().getLongitude(),
                user.getLocation().getCity(),
                user.getLocation().getAddress(),
                user.getLocation().getMoreInfo(),
                authorities);

    }
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public String getCity() {
        return city;
    }

    public String getAddress() {
        return address;
    }

    public String getMoreInfo() {
        return moreInfo;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
