import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './progress.reducer';

export const ProgressDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const progressEntity = useAppSelector(state => state.progress.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="progressDetailsHeading">Progress</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Translation missing for global.field.id</span>
          </dt>
          <dd>{progressEntity.id}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{progressEntity.notes}</dd>
          <dt>
            <span id="link">Link</span>
          </dt>
          <dd>{progressEntity.link}</dd>
          <dt>Contact</dt>
          <dd>{progressEntity.contact ? progressEntity.contact.id : ''}</dd>
          <dt>Project</dt>
          <dd>{progressEntity.project ? progressEntity.project.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/progress" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Translation missing for entity.action.back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/progress/${progressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Translation missing for entity.action.edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProgressDetail;
