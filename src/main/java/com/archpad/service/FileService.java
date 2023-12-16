package com.archpad.service;

import com.archpad.service.dto.FileDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.archpad.domain.File}.
 */
public interface FileService {
    /**
     * Save a file.
     *
     * @param fileDTO the entity to save.
     * @return the persisted entity.
     */
    FileDTO save(FileDTO fileDTO);

    /**
     * Updates a file.
     *
     * @param fileDTO the entity to update.
     * @return the persisted entity.
     */
    FileDTO update(FileDTO fileDTO);

    /**
     * Partially updates a file.
     *
     * @param fileDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FileDTO> partialUpdate(FileDTO fileDTO);

    /**
     * Get all the files.
     *
     * @param pageable the pagination information.
     * @param projectId the project of the entity.
     * @return the list of entities.
     */
    Page<FileDTO> findAll(Pageable pageable, Long projectId);

    /**
     * Get the "id" file.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FileDTO> findOne(Long id);

    /**
     * Delete the "id" file.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
