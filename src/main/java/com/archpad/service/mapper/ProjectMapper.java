package com.archpad.service.mapper;

import com.archpad.domain.Contact;
import com.archpad.domain.Project;
import com.archpad.service.dto.ContactDTO;
import com.archpad.service.dto.ProjectDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Project} and its DTO {@link ProjectDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProjectMapper extends EntityMapper<ProjectDTO, Project> {
    @Mapping(target = "customer", source = "customer", qualifiedByName = "contactId")
    ProjectDTO toDto(Project s);

    @Named("contactId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ContactDTO toDtoContactId(Contact contact);
}
