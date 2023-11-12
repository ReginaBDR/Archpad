package com.archpad.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.archpad.IntegrationTest;
import com.archpad.domain.Progress;
import com.archpad.repository.ProgressRepository;
import com.archpad.service.dto.ProgressDTO;
import com.archpad.service.mapper.ProgressMapper;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ProgressResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProgressResourceIT {

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/progresses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private ProgressMapper progressMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProgressMockMvc;

    private Progress progress;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Progress createEntity(EntityManager em) {
        Progress progress = new Progress().notes(DEFAULT_NOTES).link(DEFAULT_LINK);
        return progress;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Progress createUpdatedEntity(EntityManager em) {
        Progress progress = new Progress().notes(UPDATED_NOTES).link(UPDATED_LINK);
        return progress;
    }

    @BeforeEach
    public void initTest() {
        progress = createEntity(em);
    }

    @Test
    @Transactional
    void createProgress() throws Exception {
        int databaseSizeBeforeCreate = progressRepository.findAll().size();
        // Create the Progress
        ProgressDTO progressDTO = progressMapper.toDto(progress);
        restProgressMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(progressDTO)))
            .andExpect(status().isCreated());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeCreate + 1);
        Progress testProgress = progressList.get(progressList.size() - 1);
        assertThat(testProgress.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testProgress.getLink()).isEqualTo(DEFAULT_LINK);
    }

    @Test
    @Transactional
    void createProgressWithExistingId() throws Exception {
        // Create the Progress with an existing ID
        progress.setId(1L);
        ProgressDTO progressDTO = progressMapper.toDto(progress);

        int databaseSizeBeforeCreate = progressRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgressMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(progressDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllProgresses() throws Exception {
        // Initialize the database
        progressRepository.saveAndFlush(progress);

        // Get all the progressList
        restProgressMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(progress.getId().intValue())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK)));
    }

    @Test
    @Transactional
    void getProgress() throws Exception {
        // Initialize the database
        progressRepository.saveAndFlush(progress);

        // Get the progress
        restProgressMockMvc
            .perform(get(ENTITY_API_URL_ID, progress.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(progress.getId().intValue()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK));
    }

    @Test
    @Transactional
    void getNonExistingProgress() throws Exception {
        // Get the progress
        restProgressMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingProgress() throws Exception {
        // Initialize the database
        progressRepository.saveAndFlush(progress);

        int databaseSizeBeforeUpdate = progressRepository.findAll().size();

        // Update the progress
        Progress updatedProgress = progressRepository.findById(progress.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedProgress are not directly saved in db
        em.detach(updatedProgress);
        updatedProgress.notes(UPDATED_NOTES).link(UPDATED_LINK);
        ProgressDTO progressDTO = progressMapper.toDto(updatedProgress);

        restProgressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, progressDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(progressDTO))
            )
            .andExpect(status().isOk());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeUpdate);
        Progress testProgress = progressList.get(progressList.size() - 1);
        assertThat(testProgress.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testProgress.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    void putNonExistingProgress() throws Exception {
        int databaseSizeBeforeUpdate = progressRepository.findAll().size();
        progress.setId(longCount.incrementAndGet());

        // Create the Progress
        ProgressDTO progressDTO = progressMapper.toDto(progress);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, progressDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(progressDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProgress() throws Exception {
        int databaseSizeBeforeUpdate = progressRepository.findAll().size();
        progress.setId(longCount.incrementAndGet());

        // Create the Progress
        ProgressDTO progressDTO = progressMapper.toDto(progress);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProgressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(progressDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProgress() throws Exception {
        int databaseSizeBeforeUpdate = progressRepository.findAll().size();
        progress.setId(longCount.incrementAndGet());

        // Create the Progress
        ProgressDTO progressDTO = progressMapper.toDto(progress);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProgressMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(progressDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProgressWithPatch() throws Exception {
        // Initialize the database
        progressRepository.saveAndFlush(progress);

        int databaseSizeBeforeUpdate = progressRepository.findAll().size();

        // Update the progress using partial update
        Progress partialUpdatedProgress = new Progress();
        partialUpdatedProgress.setId(progress.getId());

        partialUpdatedProgress.notes(UPDATED_NOTES).link(UPDATED_LINK);

        restProgressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProgress.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProgress))
            )
            .andExpect(status().isOk());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeUpdate);
        Progress testProgress = progressList.get(progressList.size() - 1);
        assertThat(testProgress.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testProgress.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    void fullUpdateProgressWithPatch() throws Exception {
        // Initialize the database
        progressRepository.saveAndFlush(progress);

        int databaseSizeBeforeUpdate = progressRepository.findAll().size();

        // Update the progress using partial update
        Progress partialUpdatedProgress = new Progress();
        partialUpdatedProgress.setId(progress.getId());

        partialUpdatedProgress.notes(UPDATED_NOTES).link(UPDATED_LINK);

        restProgressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProgress.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProgress))
            )
            .andExpect(status().isOk());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeUpdate);
        Progress testProgress = progressList.get(progressList.size() - 1);
        assertThat(testProgress.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testProgress.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    void patchNonExistingProgress() throws Exception {
        int databaseSizeBeforeUpdate = progressRepository.findAll().size();
        progress.setId(longCount.incrementAndGet());

        // Create the Progress
        ProgressDTO progressDTO = progressMapper.toDto(progress);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, progressDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(progressDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProgress() throws Exception {
        int databaseSizeBeforeUpdate = progressRepository.findAll().size();
        progress.setId(longCount.incrementAndGet());

        // Create the Progress
        ProgressDTO progressDTO = progressMapper.toDto(progress);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProgressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(progressDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProgress() throws Exception {
        int databaseSizeBeforeUpdate = progressRepository.findAll().size();
        progress.setId(longCount.incrementAndGet());

        // Create the Progress
        ProgressDTO progressDTO = progressMapper.toDto(progress);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProgressMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(progressDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Progress in the database
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProgress() throws Exception {
        // Initialize the database
        progressRepository.saveAndFlush(progress);

        int databaseSizeBeforeDelete = progressRepository.findAll().size();

        // Delete the progress
        restProgressMockMvc
            .perform(delete(ENTITY_API_URL_ID, progress.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Progress> progressList = progressRepository.findAll();
        assertThat(progressList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
