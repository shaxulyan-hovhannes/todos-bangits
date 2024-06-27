import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const MAIN_THEME_COLOR = '#085769';

const DRAWER_WIDTH = 250;

const ROUTES = {
  base: '/',
  tasks: '/tasks',
  tasksTrash: '/tasks-trash',
};

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Tasks',
    route: ROUTES.tasks,
    Icon: AssignmentIcon,
  },
  {
    id: 2,
    name: 'Tasks Trash',
    route: ROUTES.tasksTrash,
    Icon: DeleteSweepIcon,
  },
];

export { MAIN_THEME_COLOR, DRAWER_WIDTH, ROUTES, MENU_ITEMS };
