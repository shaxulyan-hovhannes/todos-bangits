import { FC, Suspense, Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import MiniDrawer from "components/ui/drawer";

import { ROUTES } from "constants/common";

const Tasks = () => <h1>TASKS</h1>;
const TasksTrash = () => <h1>TASKS TRASH</h1>;

const Layout: FC = () => {
  return (
    <div className="layout">
      <MiniDrawer>
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
      </MiniDrawer>
    </div>
  );
};
export default Layout;
