package com.archpad.domain;

import static com.archpad.domain.ContactTestSamples.*;
import static com.archpad.domain.ProgressTestSamples.*;
import static com.archpad.domain.ProjectTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.archpad.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContactTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contact.class);
        Contact contact1 = getContactSample1();
        Contact contact2 = new Contact();
        assertThat(contact1).isNotEqualTo(contact2);

        contact2.setId(contact1.getId());
        assertThat(contact1).isEqualTo(contact2);

        contact2 = getContactSample2();
        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    void projectTest() throws Exception {
        Contact contact = getContactRandomSampleGenerator();
        Project projectBack = getProjectRandomSampleGenerator();

        contact.setProject(projectBack);
        assertThat(contact.getProject()).isEqualTo(projectBack);
        assertThat(projectBack.getCustomer()).isEqualTo(contact);

        contact.project(null);
        assertThat(contact.getProject()).isNull();
        assertThat(projectBack.getCustomer()).isNull();
    }

    @Test
    void progressTest() throws Exception {
        Contact contact = getContactRandomSampleGenerator();
        Progress progressBack = getProgressRandomSampleGenerator();

        contact.setProgress(progressBack);
        assertThat(contact.getProgress()).isEqualTo(progressBack);
        assertThat(progressBack.getContact()).isEqualTo(contact);

        contact.progress(null);
        assertThat(contact.getProgress()).isNull();
        assertThat(progressBack.getContact()).isNull();
    }
}
