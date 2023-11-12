import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Project from './project';
import Contact from './contact';
import File from './file';
import Progress from './progress';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="project/*" element={<Project />} />
        <Route path="contact/*" element={<Contact />} />
        <Route path="file/*" element={<File />} />
        <Route path="progress/*" element={<Progress />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
