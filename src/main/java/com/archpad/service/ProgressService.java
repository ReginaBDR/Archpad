package com.archpad.service;

import com.archpad.service.dto.ProgressAuditedDTO;
import com.archpad.service.dto.ProgressDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.archpad.domain.Progress}.
 */
public interface ProgressService {
    /**
     * Save a progress.
     *
     * @param progressDTO the entity to save.
     * @return the persisted entity.
     */
    ProgressDTO save(ProgressDTO progressDTO);

    /**
     * Updates a progress.
     *
     * @param progressDTO the entity to update.
     * @return the persisted entity.
     */
    ProgressDTO update(ProgressDTO progressDTO);

    /**
     * Partially updates a progress.
     *
     * @param progressDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProgressDTO> partialUpdate(ProgressDTO progressDTO);

    /**
     * Get all the progresses by project.
     *
     * @param pageable  the pagination information.
     * @param projectId the project of the entity.
     * @return the list of entities.
     */
    Page<ProgressAuditedDTO> findAll(Pageable pageable, Long projectId);

    /**
     * Get the "id" progress.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProgressDTO> findOne(Long id);

    /**
     * Get the "id" progress.
     *
     * @param id the id of the entity.
     * @return the entity with Audited fields.
     */
    Optional<ProgressAuditedDTO> findOneWithAudit(Long id);

    /**
     * Delete the "id" progress.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
