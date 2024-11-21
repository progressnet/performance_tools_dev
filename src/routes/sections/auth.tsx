import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import {LoginRedirectHandler} from "../../auth/LoginRedirectHandler";


// ----------------------------------------------------------------------



const SSO = {
  SignInPage: lazy(() => import('src/pages/auth/sso/sign-in')),
};


// ----------------------------------------------------------------------


const authSSO = {
  path: 'sso',
  children: [
    {
      path: 'sign-in',
      element: (
        <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
          <SSO.SignInPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'login-redirect',
      element: (
        <Suspense fallback={<SplashScreen />}>
          <LoginRedirectHandler />
        </Suspense>
      ),
    },
  ]
};
export const authRoutes = [
  {
    path: '/FinanceFactoryTimesheet/auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      authSSO,
    ],
  },

];
