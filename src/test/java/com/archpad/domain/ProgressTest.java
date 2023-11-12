package com.archpad.domain;

import static com.archpad.domain.ContactTestSamples.*;
import static com.archpad.domain.ProgressTestSamples.*;
import static com.archpad.domain.ProjectTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.archpad.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProgressTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Progress.class);
        Progress progress1 = getProgressSample1();
        Progress progress2 = new Progress();
        assertThat(progress1).isNotEqualTo(progress2);

        progress2.setId(progress1.getId());
        assertThat(progress1).isEqualTo(progress2);

        progress2 = getProgressSample2();
        assertThat(progress1).isNotEqualTo(progress2);
    }

    @Test
    void contactTest() throws Exception {
        Progress progress = getProgressRandomSampleGenerator();
        Contact contactBack = getContactRandomSampleGenerator();

        progress.setContact(contactBack);
        assertThat(progress.getContact()).isEqualTo(contactBack);

        progress.contact(null);
        assertThat(progress.getContact()).isNull();
    }

    @Test
    void projectTest() throws Exception {
        Progress progress = getProgressRandomSampleGenerator();
        Project projectBack = getProjectRandomSampleGenerator();

        progress.setProject(projectBack);
        assertThat(progress.getProject()).isEqualTo(projectBack);

        progress.project(null);
        assertThat(progress.getProject()).isNull();
    }
}
