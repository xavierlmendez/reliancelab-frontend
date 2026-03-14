import { TaskViewProvider } from './contexts/TaskViewContext';
import { TaskView } from './views/task-view/TaskView';

function App() {
  return (
    <TaskViewProvider>
      <TaskView />
    </TaskViewProvider>
  );
}

export default App
