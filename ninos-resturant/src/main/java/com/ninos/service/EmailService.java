package com.ninos.service;

import com.ninos.dto.Mail;

public interface EmailService {

    public void sendCodeByMail(Mail mail);
}
