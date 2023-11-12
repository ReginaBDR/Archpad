package com.archpad.service.impl;

import com.archpad.domain.Progress;
import com.archpad.repository.ProgressRepository;
import com.archpad.service.ProgressService;
import com.archpad.service.dto.ProgressDTO;
import com.archpad.service.mapper.ProgressMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.archpad.domain.Progress}.
 */
@Service
@Transactional
public class ProgressServiceImpl implements ProgressService {

    private final Logger log = LoggerFactory.getLogger(ProgressServiceImpl.class);

    private final ProgressRepository progressRepository;

    private final ProgressMapper progressMapper;

    public ProgressServiceImpl(ProgressRepository progressRepository, ProgressMapper progressMapper) {
        this.progressRepository = progressRepository;
        this.progressMapper = progressMapper;
    }

    @Override
    public ProgressDTO save(ProgressDTO progressDTO) {
        log.debug("Request to save Progress : {}", progressDTO);
        Progress progress = progressMapper.toEntity(progressDTO);
        progress = progressRepository.save(progress);
        return progressMapper.toDto(progress);
    }

    @Override
    public ProgressDTO update(ProgressDTO progressDTO) {
        log.debug("Request to update Progress : {}", progressDTO);
        Progress progress = progressMapper.toEntity(progressDTO);
        progress = progressRepository.save(progress);
        return progressMapper.toDto(progress);
    }

    @Override
    public Optional<ProgressDTO> partialUpdate(ProgressDTO progressDTO) {
        log.debug("Request to partially update Progress : {}", progressDTO);

        return progressRepository
            .findById(progressDTO.getId())
            .map(existingProgress -> {
                progressMapper.partialUpdate(existingProgress, progressDTO);

                return existingProgress;
            })
            .map(progressRepository::save)
            .map(progressMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProgressDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Progresses");
        return progressRepository.findAll(pageable).map(progressMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProgressDTO> findOne(Long id) {
        log.debug("Request to get Progress : {}", id);
        return progressRepository.findById(id).map(progressMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Progress : {}", id);
        progressRepository.deleteById(id);
    }
}
