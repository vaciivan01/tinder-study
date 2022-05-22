import React, { useState } from 'react'
import { Modal, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisibility, setAnswer } from "../hideSlice";

function MultiRadioModal(props) {
  const context = props.content
  const key = props.keyForContext
  const [osobineValues, setosobineValues] = useState({});

  const dispatch = useDispatch();
  const showElement = useSelector(state => state.hide.shownElements);
  const currentState = useSelector(state => state.hide.questions);

  function sendAnswers(key, radioChecker) {
    dispatch(setAnswer({ keyForQuestion: key, value: radioChecker, currentState }))
    dispatch(toggleVisibility({ state: showElement, next: props.content.next, current: key }))
  }

  function checkSelected(osob, elem, key) {
    osobineValues[osob] = elem + 1
    setosobineValues(osobineValues)
    if(Object.keys(osobineValues).length === 6){
        let tst = {}
        tst[key] = osobineValues
        sendAnswers("osobine", tst)
    }
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>1 (Malo)</th>
                <th>2</th>
                <th>3</th>
                <th>4 (Srednje)</th>
                <th>5</th>
                <th>6</th>
                <th>7 (Mnogo)</th>
              </tr>
            </thead>
            <tbody>
              {context["multiRadioOptions"]["traits"].map((osob) => {
                return (
                  <tr>
                    <td>{osob}</td>
                    {[...Array(7)].map((elem, index) => (
                      <td><Form.Check inline name={osob} type='radio' id={elem} key={elem} onClick={() => { checkSelected(osob, index, key); }} /></td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MultiRadioModal;
