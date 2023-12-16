package com.archpad.repository;

import com.archpad.domain.File;
import com.archpad.domain.Progress;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the File entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    @Query(value = "SELECT * FROM file f WHERE f.project_id = :projectId", nativeQuery = true)
    Page<File> findAllFilesByProjectId(Pageable pageable, @Param("projectId") Long projectId);
}
