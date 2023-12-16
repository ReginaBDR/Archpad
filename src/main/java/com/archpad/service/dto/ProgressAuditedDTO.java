package com.archpad.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.archpad.domain.Progress} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProgressDTO implements Serializable {

    private Long id;

    private String notes;

    private String link;

    private ContactDTO contact;

    private ProjectDTO project;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public ContactDTO getContact() {
        return contact;
    }

    public void setContact(ContactDTO contact) {
        this.contact = contact;
    }

    public ProjectDTO getProject() {
        return project;
    }

    public void setProject(ProjectDTO project) {
        this.project = project;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProgressDTO)) {
            return false;
        }

        ProgressDTO progressDTO = (ProgressDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, progressDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProgressDTO{" +
            "id=" + getId() +
            ", notes='" + getNotes() + "'" +
            ", link='" + getLink() + "'" +
            ", contact=" + getContact() +
            ", project=" + getProject() +
            "}";
    }
}
