import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './file.reducer';

export const FileDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fileEntity = useAppSelector(state => state.file.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fileDetailsHeading">File</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Translation missing for global.field.id</span>
          </dt>
          <dd>{fileEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{fileEntity.name}</dd>
          <dt>
            <span id="file">File</span>
          </dt>
          <dd>
            {fileEntity.file ? (
              <div>
                {fileEntity.fileContentType ? (
                  <a onClick={openFile(fileEntity.fileContentType, fileEntity.file)}>Translation missing for entity.action.open&nbsp;</a>
                ) : null}
                <span>
                  {fileEntity.fileContentType}, {byteSize(fileEntity.file)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{fileEntity.description}</dd>
          <dt>Project</dt>
          <dd>{fileEntity.project ? fileEntity.project.id : ''}</dd>
          <dt>Progress</dt>
          <dd>{fileEntity.progress ? fileEntity.progress.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/file" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Translation missing for entity.action.back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file/${fileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Translation missing for entity.action.edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FileDetail;
