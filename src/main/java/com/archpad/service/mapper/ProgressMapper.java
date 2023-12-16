package com.archpad.service.mapper;

import com.archpad.domain.Contact;
import com.archpad.domain.Progress;
import com.archpad.domain.Project;
import com.archpad.service.dto.ContactDTO;
import com.archpad.service.dto.ProgressDTO;
import com.archpad.service.dto.ProjectDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Progress} and its DTO {@link ProgressDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProgressMapper extends EntityMapper<ProgressDTO, Progress> {
    @Mapping(target = "contact", source = "contact")
    @Mapping(target = "project", source = "project", qualifiedByName = "projectId")
    ProgressDTO toDto(Progress s);

    @Named("contactId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ContactDTO toDtoContactId(Contact contact);

    @Named("projectId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProjectDTO toDtoProjectId(Project project);
}
