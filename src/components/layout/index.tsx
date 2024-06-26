import { FC, Suspense, Fragment, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import MUIDrawer from "components/ui/drawer";

import { ROUTES } from "constants/common";

const Tasks = lazy(() => import("components/pages/tasks"));
const TasksTrash = lazy(() => import("components/pages/tasks-trash"));

const Layout: FC = () => {
  return (
    <div className="layout">
      <MUIDrawer>
        <Routes>
          <Route
            path={ROUTES.tasks}
            element={
              <Suspense fallback={<Fragment />}>
                <Tasks />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.tasksTrash}
            element={
              <Suspense fallback={<Fragment />}>
                <TasksTrash />
              </Suspense>
            }
          />
        </Routes>
      </MUIDrawer>
    </div>
  );
};
export default Layout;
