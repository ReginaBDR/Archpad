package com.archpad.repository;

import com.archpad.domain.Progress;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Progress entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    @Query(value = "SELECT * FROM progress p WHERE p.id = :progressId", nativeQuery = true)
    Optional<Progress> findProgressByIdWithAudit(@Param("progressId") Long progressId);

    @Query(value = "SELECT * FROM progress p WHERE p.project_id = :projectId", nativeQuery = true)
    Page<Progress> findAllProgressesByProjectIdWithAudit(Pageable pageable, @Param("projectId") Long projectId);
}
