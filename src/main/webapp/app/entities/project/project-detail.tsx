import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project.reducer';

export const ProjectDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const projectEntity = useAppSelector(state => state.project.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectDetailsHeading">Project</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Translation missing for global.field.id</span>
          </dt>
          <dd>{projectEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{projectEntity.name}</dd>
          <dt>
            <span id="streetAddress">Street Address</span>
          </dt>
          <dd>{projectEntity.streetAddress}</dd>
          <dt>
            <span id="postalCode">Postal Code</span>
          </dt>
          <dd>{projectEntity.postalCode}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{projectEntity.city}</dd>
          <dt>
            <span id="stateProvince">State Province</span>
          </dt>
          <dd>{projectEntity.stateProvince}</dd>
          <dt>
            <span id="country">Country</span>
          </dt>
          <dd>{projectEntity.country}</dd>
          <dt>
            <span id="startDate">Start Date</span>
          </dt>
          <dd>
            {projectEntity.startDate ? <TextFormat value={projectEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="deadline">Deadline</span>
          </dt>
          <dd>
            {projectEntity.deadline ? <TextFormat value={projectEntity.deadline} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{projectEntity.status}</dd>
          <dt>Customer</dt>
          <dd>{projectEntity.customer ? projectEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/project" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Translation missing for entity.action.back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project/${projectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Translation missing for entity.action.edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectDetail;
