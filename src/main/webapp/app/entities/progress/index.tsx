import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import Progress from './progress';
import ProgressUpdate from './progress-update';

const ProgressRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Progress />} />
    <Route path="new" element={<ProgressUpdate />} />
    <Route path=":id">
      <Route path="edit" element={<ProgressUpdate />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProgressRoutes;
