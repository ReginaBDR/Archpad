import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import File from './file';
import FileUpdate from './file-update';

const FileRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<File />} />
    <Route path="new" element={<FileUpdate />} />
    <Route path=":id">
      <Route path="edit" element={<FileUpdate />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FileRoutes;
