import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './contact.reducer';

export const ContactDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const contactEntity = useAppSelector(state => state.contact.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="contactDetailsHeading">Contact</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Translation missing for global.field.id</span>
          </dt>
          <dd>{contactEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{contactEntity.name}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{contactEntity.lastName}</dd>
          <dt>
            <span id="company">Company</span>
          </dt>
          <dd>{contactEntity.company}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{contactEntity.address}</dd>
          <dt>
            <span id="phone">Phone</span>
          </dt>
          <dd>{contactEntity.phone}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{contactEntity.email}</dd>
          <dt>
            <span id="role">Role</span>
          </dt>
          <dd>{contactEntity.role}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{contactEntity.notes}</dd>
        </dl>
        <Button tag={Link} to="/contact" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Translation missing for entity.action.back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contact/${contactEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Translation missing for entity.action.edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ContactDetail;
