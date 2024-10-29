

const ROOTS = {
  AUTH: '/FinanceFactoryTimesheet/auth',
  DASHBOARD: '/FinanceFactoryTimesheet/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/FinanceFactoryTimesheet/error/403',
  page404: '/FinanceFactoryTimesheet/error/404',
  page500: '/FinanceFactoryTimesheet/error/500',
  // AUTH
  auth: {
    sso: {
      signIn: `${ROOTS.AUTH}/sso/sign-in`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    test: `${ROOTS.DASHBOARD}/test`,
    // myTasks: {
    //   root: `${ROOTS.DASHBOARD}/my-tasks`,
    //   process: `${ROOTS.DASHBOARD}/my-tasks/process`,
    //   subprocess: `${ROOTS.DASHBOARD}/my-tasks/subprocess`,
    //   task: `${ROOTS.DASHBOARD}/my-tasks/task`,
    //   entities: `${ROOTS.DASHBOARD}/my-tasks/entities`,
    // },
    myTasks:  `${ROOTS.DASHBOARD}/my-tasks`,
    calendar: `${ROOTS.DASHBOARD}`,
  }
};
