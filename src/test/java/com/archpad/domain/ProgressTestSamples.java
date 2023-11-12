package com.archpad.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ProgressTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Progress getProgressSample1() {
        return new Progress().id(1L).notes("notes1").link("link1");
    }

    public static Progress getProgressSample2() {
        return new Progress().id(2L).notes("notes2").link("link2");
    }

    public static Progress getProgressRandomSampleGenerator() {
        return new Progress().id(longCount.incrementAndGet()).notes(UUID.randomUUID().toString()).link(UUID.randomUUID().toString());
    }
}
