import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUser } from '../features/auth/authSlice';

import PrivateRoute from '../common/components/PrivateRoute';
import ClinicDetailPage from '../features/clinicDetail/ClinicDetailPage';
import AuthPage from '../features/auth/AuthPage';
import LandingPage from '../features/landing/LandingPage';
import CategoriesPage from '../features/categories/CategoriesPage';
import TreatmentDetailPage from '../features/treatmentDetail/TreatmentDetailPage';
import ClinicsListPage from '../features/clinics/ClinicsListPage';
import FullScreenLoading from '../common/components/FullScreenLoading';
import ProfilePage from '../features/profile/ProfilePage';
import ScrollToTop from '../common/components/ScrollToTop';

/* 
  Parent component of all other components.
*/

const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  /* 
    On start up, fetch user from local storage and populate the Redux store
  */
  useEffect(() => {
    i18n.changeLanguage(localStorage.i18nextLng);
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className='w-full min-h-screen bg-offwhite mx-auto max-w-md relative overflow-hidden'>
      <ScrollToTop />
      {loading ? (
        <FullScreenLoading />
      ) : (
        <Switch>
          <Route exact path='/'>
            {user ? <Redirect to='/categories' /> : <LandingPage />}
          </Route>
          <Route exact path='/auth'>
            {user ? <Redirect to='/categories' /> : <AuthPage />}
          </Route>
          <PrivateRoute exact path='/categories' component={CategoriesPage} />
          <PrivateRoute
            exact
            path='/categories/:categoryId'
            component={ClinicsListPage}
          />
          <PrivateRoute
            exact
            path='/clinics/:clinicId'
            component={ClinicDetailPage}
          />
          <PrivateRoute
            exact
            path='/treatments/:treatmentId'
            component={TreatmentDetailPage}
          />
          <PrivateRoute exact path='/profile' component={ProfilePage} />
        </Switch>
      )}
    </div>
  );
};

export default App;
