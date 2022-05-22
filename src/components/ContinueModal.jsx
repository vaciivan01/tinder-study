import {Modal, Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisibility, setAnswer } from "../hideSlice";

function ContinueModal(props) {
  const context = props.content
  const key = props.keyForContext

  const dispatch = useDispatch();
  const showElement = useSelector(state => state.hide.shownElements);
  const currentState = useSelector(state => state.hide.questions);

  function sendAnswers () {
    dispatch(toggleVisibility({state: showElement, next: props.content.next, current: key}))
    dispatch(setAnswer({keyForQuestion: key, value: "Accepted", currentState}))
  }

  return (
    <>
      <Modal
      size="xl"
      show={showElement[key]}
      >
        <Modal.Header>
            <Modal.Title>{context.headerText}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p className="modal-p">{context.bodyText}</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="primary"  onClick={() => {sendAnswers()}}>Continue</Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default ContinueModal;
