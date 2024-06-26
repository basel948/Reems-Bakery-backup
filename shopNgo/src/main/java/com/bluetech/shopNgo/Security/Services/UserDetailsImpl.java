package com.bluetech.shopNgo.Security.Services;

import com.bluetech.shopNgo.Models.Order;
import com.bluetech.shopNgo.Models.User;
import com.bluetech.shopNgo.DTO.UserLocationDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    private List<Order> orders;
    private List<UserLocationDTO> locations;

    public UserDetailsImpl(Long id, String username, String email, String password, String phoneNumber,
                           Collection<? extends GrantedAuthority> authorities, List<Order> orders, List<UserLocationDTO> locations) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.authorities = authorities;
        this.orders = orders;
        this.locations = locations;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getPhoneNumber(),
                authorities,
                user.getOrders(),
                user.getLocations());
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

    public List<UserLocationDTO> getLocations() {
        return locations;
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
