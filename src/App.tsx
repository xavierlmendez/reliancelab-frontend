import { ToastDisplay } from './components/ToastDisplay/ToastController';
import { useRoutingContext } from './contexts/RoutingContext';
import { SurveyProvider } from './contexts/SurveyContext';
import { TaskViewProvider } from './contexts/TaskViewContext';
import { CompleteView } from './views/CompleteView';
import { InstructionsView } from './views/InstructionsView';
import { OnboardingView } from './views/OnboardingView';
import { SurveyView } from './views/SurveyView';
import { TaskView } from './views/task-view/TaskView';

function App() {
  const { currentRoute } = useRoutingContext();

  return (
    <>
      <ToastDisplay />
      {(() => {
        switch (currentRoute) {
          case 'onboarding': return (<SurveyProvider><OnboardingView /></SurveyProvider>);
          case 'instructions': return (<InstructionsView />);
          case 'task': return (<TaskViewProvider><TaskView /></TaskViewProvider>);
          case 'survey': return (<SurveyProvider><SurveyView /></SurveyProvider>);
          case 'complete': return (<CompleteView />);
        }
      })()}
    </>
  );
}

export default App