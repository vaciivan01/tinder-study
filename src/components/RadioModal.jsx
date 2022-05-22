import {Modal, Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisibility, setAnswer, exitTest } from "../hideSlice";

function RadioModal(props) {
  const context = props.content
  const key = props.keyForContext

  const dispatch = useDispatch();
  const showElement = useSelector(state => state.hide.shownElements);
  const currentState = useSelector(state => state.hide.questions);

  function sendAnswers (answer) {
    if(answer.action === 'exit'){
      return dispatch(exitTest({current: key, value: answer.text}))
    }
    dispatch(toggleVisibility({state: showElement, next: props.content.next, current: key}))
    dispatch(setAnswer({keyForQuestion: key, value: answer.text, currentState}))
  }

  function multiRadio (content) {
      const rows = [];
      content["options"].forEach(option => {
          rows.push(
              <Button variant="primary" onClick={() => sendAnswers({text: option.text, action: option.action})}>{option.text}</Button>    
          )
      });
      return rows;
  }
  
  return (
    <>
      <Modal
      size="xl"
      show={showElement[key]}
      >
        <Modal.Header closeButton>
            <Modal.Title>{context.headerText}</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
            {multiRadio(context)}
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default RadioModal;
