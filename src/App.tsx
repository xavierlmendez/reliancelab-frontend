import { ToastDisplay } from './components/ToastDisplay/ToastController';
import { useRoutingContext } from './contexts/RoutingContext';
import { SurveyProvider } from './contexts/SurveyContext';
import { TaskViewProvider } from './contexts/TaskViewContext';
import { CompleteView } from './views/complete-view/CompleteView';
import { OnboardingView } from './views/onboarding-view/OnboardingView';
import { SurveyView } from './views/survey-view/SurveyView';
import { TaskView } from './views/task-view/TaskView';

function App() {
  const { currentRoute } = useRoutingContext();

  return (
    <>
      <ToastDisplay />
      {(() => {
        switch (currentRoute) {
          case 'onboarding': return (<SurveyProvider><OnboardingView /></SurveyProvider>);
          case 'task': return (<TaskViewProvider><TaskView /></TaskViewProvider>);
          case 'survey': return (<SurveyView />);
          case 'complete': return (<CompleteView />);
        }
      })()}
    </>
  );
}

export default App