import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { IProject } from 'app/shared/model/project.model';
import { ProjectStatus } from 'app/shared/model/enumerations/project-status.model';
import { getEntity, updateEntity, createEntity, reset } from './project.reducer';

export const ProjectUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const contacts = useAppSelector(state => state.contact.entities);
  const projectEntity = useAppSelector(state => state.project.entity);
  const loading = useAppSelector(state => state.project.loading);
  const updating = useAppSelector(state => state.project.updating);
  const updateSuccess = useAppSelector(state => state.project.updateSuccess);
  const projectStatusValues = Object.keys(ProjectStatus);

  const handleClose = () => {
    navigate('/project' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getContacts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...projectEntity,
      ...values,
      customer: contacts.find(it => it.id.toString() === values.customer.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          status: 'PENDING',
          ...projectEntity,
          customer: projectEntity?.customer?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="archpadApp.project.home.createOrEditLabel" data-cy="ProjectCreateUpdateHeading">
            Create or edit a Project
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="project-id"
                  label="Translation missing for global.field.id"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label="Name" id="project-name" name="name" data-cy="name" type="text" />
              <ValidatedField label="Street Address" id="project-streetAddress" name="streetAddress" data-cy="streetAddress" type="text" />
              <ValidatedField label="Postal Code" id="project-postalCode" name="postalCode" data-cy="postalCode" type="text" />
              <ValidatedField label="City" id="project-city" name="city" data-cy="city" type="text" />
              <ValidatedField label="State Province" id="project-stateProvince" name="stateProvince" data-cy="stateProvince" type="text" />
              <ValidatedField label="Country" id="project-country" name="country" data-cy="country" type="text" />
              <ValidatedField label="Start Date" id="project-startDate" name="startDate" data-cy="startDate" type="date" />
              <ValidatedField label="Deadline" id="project-deadline" name="deadline" data-cy="deadline" type="date" />
              <ValidatedField label="Status" id="project-status" name="status" data-cy="status" type="select">
                {projectStatusValues.map(projectStatus => (
                  <option value={projectStatus} key={projectStatus}>
                    {projectStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="project-customer" name="customer" data-cy="customer" label="Customer" type="select">
                <option value="" key="0" />
                {contacts
                  ? contacts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/project" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Translation missing for entity.action.back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Translation missing for entity.action.save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProjectUpdate;
