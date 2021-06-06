package com.ninos.util;

import java.util.UUID;

public class Code {

    public String getCode() {
        return  UUID.randomUUID().toString();
    }


}
