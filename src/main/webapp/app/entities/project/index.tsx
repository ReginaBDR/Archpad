import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import Project from './project';
import ProjectDetail from './project-detail';
import ProjectUpdate from './project-update';

const ProjectRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Project />} />
    <Route path="new" element={<ProjectUpdate />} />
    <Route path=":id">
      <Route index element={<ProjectDetail />} />
      <Route path="edit" element={<ProjectUpdate />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProjectRoutes;
