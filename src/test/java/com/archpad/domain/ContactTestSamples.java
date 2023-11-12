package com.archpad.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ContactTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Contact getContactSample1() {
        return new Contact()
            .id(1L)
            .name("name1")
            .lastName("lastName1")
            .company("company1")
            .address("address1")
            .phone(1L)
            .email("email1")
            .role("role1")
            .notes("notes1");
    }

    public static Contact getContactSample2() {
        return new Contact()
            .id(2L)
            .name("name2")
            .lastName("lastName2")
            .company("company2")
            .address("address2")
            .phone(2L)
            .email("email2")
            .role("role2")
            .notes("notes2");
    }

    public static Contact getContactRandomSampleGenerator() {
        return new Contact()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .company(UUID.randomUUID().toString())
            .address(UUID.randomUUID().toString())
            .phone(longCount.incrementAndGet())
            .email(UUID.randomUUID().toString())
            .role(UUID.randomUUID().toString())
            .notes(UUID.randomUUID().toString());
    }
}
