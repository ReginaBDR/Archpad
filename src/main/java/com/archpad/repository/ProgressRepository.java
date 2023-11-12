package com.archpad.repository;

import com.archpad.domain.Progress;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Progress entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {}
