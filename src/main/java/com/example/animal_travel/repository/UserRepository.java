package com.example.animal_travel.repository;

import com.example.animal_travel.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username);
    List<User> findAllBy();
    boolean existsUserByUsername(String username);
    void deleteUserByUsername(String username);

}