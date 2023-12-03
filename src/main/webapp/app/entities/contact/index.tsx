import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import Contact from './contact';
import ContactDetail from './contact-detail';
import ContactUpdate from './contact-update';

const ContactRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Contact />} />
    <Route path="new" element={<ContactUpdate />} />
    <Route path=":id">
      <Route index element={<ContactDetail />} />
      <Route path="edit" element={<ContactUpdate />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ContactRoutes;
