package com.archpad.domain;

import static com.archpad.domain.FileTestSamples.*;
import static com.archpad.domain.ProgressTestSamples.*;
import static com.archpad.domain.ProjectTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.archpad.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FileTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(File.class);
        File file1 = getFileSample1();
        File file2 = new File();
        assertThat(file1).isNotEqualTo(file2);

        file2.setId(file1.getId());
        assertThat(file1).isEqualTo(file2);

        file2 = getFileSample2();
        assertThat(file1).isNotEqualTo(file2);
    }

    @Test
    void projectTest() throws Exception {
        File file = getFileRandomSampleGenerator();
        Project projectBack = getProjectRandomSampleGenerator();

        file.setProject(projectBack);
        assertThat(file.getProject()).isEqualTo(projectBack);

        file.project(null);
        assertThat(file.getProject()).isNull();
    }

    @Test
    void progressTest() throws Exception {
        File file = getFileRandomSampleGenerator();
        Progress progressBack = getProgressRandomSampleGenerator();

        file.setProgress(progressBack);
        assertThat(file.getProgress()).isEqualTo(progressBack);

        file.progress(null);
        assertThat(file.getProgress()).isNull();
    }
}
