package com.archpad.service.mapper;

import com.archpad.domain.File;
import com.archpad.domain.Progress;
import com.archpad.domain.Project;
import com.archpad.service.dto.FileDTO;
import com.archpad.service.dto.ProgressDTO;
import com.archpad.service.dto.ProjectDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link File} and its DTO {@link FileDTO}.
 */
@Mapper(componentModel = "spring")
public interface FileMapper extends EntityMapper<FileDTO, File> {
    @Mapping(target = "project", source = "project", qualifiedByName = "projectId")
    @Mapping(target = "progress", source = "progress", qualifiedByName = "progressId")
    FileDTO toDto(File s);

    @Named("projectId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProjectDTO toDtoProjectId(Project project);

    @Named("progressId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProgressDTO toDtoProgressId(Progress progress);
}
