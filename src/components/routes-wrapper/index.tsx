import React, { lazy, Suspense, Fragment, FC } from "react";
import { Routes, Route } from "react-router-dom";

// import DashboardLayout from "components/layouts/dashboard-layout";

import { ROUTES } from "constants/common";

// const Tasks = lazy(() => import("components/pages/income"));
// const TasksTrash = lazy(() => import("components/pages/expenses"));

const RoutesWrapper: any = () => {
  //   return (
  //     <Routes>
  //       <Route
  //         path={ROUTES.income}
  //         element={
  //           <DashboardLayout>
  //             <Suspense fallback={<Fragment />}>
  //               <Income />
  //             </Suspense>
  //           </DashboardLayout>
  //         }
  //       />
  //       <Route
  //         path={ROUTES.expenses}
  //         element={
  //           <Suspense fallback={<Fragment />}>
  //             <Expenses />
  //           </Suspense>
  //         }
  //       />
  //     </Routes>
  //   );

  return <div>fdksjfklj</div>;
};

export default RoutesWrapper;
