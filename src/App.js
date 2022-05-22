import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import context from './content/textForModals.json';
import ContinueModal from './components/ContinueModal';
import InputModal from './components/InputModal';
import MultiRadioModal from './components/MultiRadioModal';
import RadioModal from './components/RadioModal';
import SwipeLeftOrRight from './components/SwipeLeftOrRight';
import PerSwipe from './components/PerSwipe';


function App() {
  function loopThroughQuestions () {
    const rows = [];
    Object.keys(context).forEach(function(keyForContext) {
      if(context[keyForContext].type === "continue"){
        rows.push(<ContinueModal content={context[keyForContext]} keyForContext={keyForContext} />)
      }else if(context[keyForContext].type === "input"){
        rows.push(<InputModal content={context[keyForContext]} keyForContext={keyForContext} />)
      }else if(context[keyForContext].type === "radio"){
        rows.push(<RadioModal content={context[keyForContext]} keyForContext={keyForContext} />)
      }else if(context[keyForContext].type === "multiradio"){
        rows.push(<MultiRadioModal content={context[keyForContext]} keyForContext={keyForContext} />)
      }else if(context[keyForContext].type === "swipe"){
        rows.push(<SwipeLeftOrRight content={context[keyForContext]} keyForContext={keyForContext} />)
      }else if(context[keyForContext].type === "perSwipe"){
        rows.push(<PerSwipe content={context[keyForContext]} keyForContext={keyForContext} />)
      }
    })
    return rows
  }
  return (
    <div className="App">
      <header className="App-header">
        {loopThroughQuestions()}
      </header>
    </div>
  );
}

export default App;
