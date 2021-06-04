package com.ninos.repository;

import com.ninos.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    public User findUserByEmail(String email);

    public boolean existsByEmail(String email);

}
