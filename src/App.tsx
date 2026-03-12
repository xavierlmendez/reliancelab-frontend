import { UserViewProvider } from './contexts/UserViewContext';
import { UserView } from './views/user-view/UserView'

function App() {
  return (
    <UserViewProvider>
      <UserView />
    </UserViewProvider>
  );
}

export default App
