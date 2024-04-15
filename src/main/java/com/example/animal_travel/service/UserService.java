package com.example.animal_travel.service;

import com.example.animal_travel.data.from.LoginUserDTO;
import com.example.animal_travel.data.from.PasswordChangeDTO;
import com.example.animal_travel.data.from.RegisterUserDTO;
import com.example.animal_travel.data.to.JwtDTO;
import com.example.animal_travel.data.to.MessageDTO;
import com.example.animal_travel.entity.Citizenship;
import com.example.animal_travel.entity.User;
import com.example.animal_travel.repository.CitizenshipRepository;
import com.example.animal_travel.repository.UserRepository;
import com.example.animal_travel.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;
    private UserRepository userRepository;
    private CitizenshipRepository citizenshipRepository;
    public List<User> getAll(){
        return userRepository.findAllBy();
    }

    public void addUser(User user){
        userRepository.save(user);
    }

    public boolean existsUser(String username){
        return userRepository.existsUserByUsername(username);
    }

    public User findUserByUsername(String username){
        return userRepository.findUserByUsername(username);
    }

    public JwtDTO loginUser(LoginUserDTO userDTO){

        if(userDTO.getUsername().isBlank() || userDTO.getPassword().isBlank()){
            return new JwtDTO(true, "Неверный логин или пароль", null, null);
        }

        if (!existsUser(userDTO.getUsername())){
            return new JwtDTO(true, "Такого пользователя нет", null, null);
        }

        UserDetails userDetails = loadUserByUsername(userDTO.getUsername());

        if(!encoder.matches(userDTO.getPassword(), userDetails.getPassword())){
            return new JwtDTO(true, "Неверный логин или пароль", null, null);
        }

        String token = jwtUtil.generateToken(userDTO.getUsername());

        return new JwtDTO(false, "Success", userDTO.getUsername(), token);
    }

    public JwtDTO registerUser(RegisterUserDTO userDTO){
        String username = userDTO.getUsername();

        if(userDTO.getUsername().isBlank() || userDTO.getPassword().isBlank()){
            return new JwtDTO(true, "Неверный логин или пароль", null, null);
        }

        if (existsUser(userDTO.getUsername())){
            return new JwtDTO(true, "Такой пользователь уже существует", null, null);
        }

        if (!citizenshipRepository.existsCountryByNameEqualsIgnoreCase(userDTO.getCitizenship())){
            return new JwtDTO(true, "Неверное гражданство", null, null);
        }

        String token = jwtUtil.generateToken(username);

        User user = new User();
        user.setUsername(username);
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setFio(userDTO.getFio());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setCitizenship(citizenshipRepository.findFirstByName(userDTO.getCitizenship()));

        this.addUser(user);

        return new JwtDTO(false, "Success", userDTO.getUsername(), token);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (Objects.isNull(user)){
            throw new UsernameNotFoundException(String.format("%s not found", username));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new HashSet<>());
    }

    public String extractUsername(){
        return ((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
    }

    public MessageDTO updateInfo(RegisterUserDTO userDTO) {

        if (!citizenshipRepository.existsCountryByNameEqualsIgnoreCase(userDTO.getCitizenship())){
            return new MessageDTO(true, "Неверное гражданство");
        }

        String username = extractUsername();
        User user = userRepository.findUserByUsername(username);

        user.setFio(userDTO.getFio());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setCitizenship(citizenshipRepository.findFirstByName(userDTO.getCitizenship()));

        userRepository.save(user);

        return new MessageDTO(false, "Успешно");

    }

    public MessageDTO changePassword(PasswordChangeDTO passwordDTO) {
        String username = extractUsername();

        if(!username.equals(passwordDTO.getUsername())){
            return new MessageDTO(true, "Ошибка доступа к изменению");
        }

        UserDetails userDetails = loadUserByUsername(username);

        if(!encoder.matches(passwordDTO.getOldPassword(), userDetails.getPassword())){
            return new MessageDTO(true, "Неверный пароль от аккаунта");
        }

        if(passwordDTO.getNewPassword().isBlank()){
            return new MessageDTO(true, "Новый пароль не должен быть пустым");
        }

        User user = userRepository.findUserByUsername(username);
        user.setPassword(encoder.encode(passwordDTO.getNewPassword()));
        userRepository.save(user);

        return new MessageDTO(false, "Успешно");

    }

    public MessageDTO delete(LoginUserDTO loginUserDTO) {
        String username = extractUsername();
        if(!username.equals(loginUserDTO.getUsername())){
            return new MessageDTO(true, "Ошибка доступа!");
        }

        User user = userRepository.findUserByUsername(username);
        userRepository.delete(user);

        return new MessageDTO(false, "Аккаунт удалён");

    }
}