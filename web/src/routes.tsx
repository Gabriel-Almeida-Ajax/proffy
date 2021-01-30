import React, { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Singin from './pages/Landing/auth/singin';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/singin" component={Singin} />
    </BrowserRouter>
  );
}

export default Routes;
