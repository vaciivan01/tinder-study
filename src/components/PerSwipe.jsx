import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFinalResults, setAnswer } from "../hideSlice";
import { Card, Form, Table } from "react-bootstrap";

function PerSwipe(props) {
    const [faces, setFaces] = useState({});
    const context = props.content
    const key = props.keyForContext

    const dispatch = useDispatch();
    const showElement = useSelector(state => state.hide.shownElements);
    const questionElement = useSelector(state => state.hide.questions);
    const showFinal = useSelector(state => state.hide.showFinal);
    const dbToChose = useSelector(state => state.hide.dbPics);
    let db = questionElement.pol == "Muški" ? dbToChose["Ženski"] : dbToChose["Muški"]
    const [showCard, setShowCard] = useState(db);
    const [osobineValues, setosobineValues] = useState({});
    const [fileResults, setfileResults] = useState([]);

    useEffect(() => {
        setShowCard( questionElement.pol == "Muški" ? dbToChose["Ženski"] : dbToChose["Muški"]);
      }, [questionElement.pol]);

    function checkSelected(osob, elem, keyImage){
        osobineValues[osob] = elem + 1
        setosobineValues(osobineValues)
        if(Object.keys(osobineValues).length === 6){
            let tst = {}
            tst[keyImage] = osobineValues
            dispatch(addFinalResults({ keyForQuestion: key, value: tst }))
            setosobineValues({})
            fileResults.push(tst)
            setfileResults(fileResults)
        }

        if(fileResults.length === showCard.length){
            dispatch(setAnswer({ keyForQuestion: key, value: fileResults }))
        }
    }
    
    function sendAnswers(results) {
    }

    function loopDb (dbPics) {
        return dbPics.map((item, index) => {
            return showFinal[index] ? cardRank(item, item.url.replace("/images/muska_lica/", "").replace("/images/zenska_lica/", "").replace(".jpg", "")) : ""
        })
    }

    function cardRank(item, imageKey) {
        let osobine = ["Inteligencija", "Ambicioznost", "Dobra mogućnost zarađivanja", "Zdravlje", "Poštovanje porodičnih vrednosti", "Dobrota"];
        return (
            <Card className="text-center">
                <Card.Img variant="top" src={item.url} style={{ width: "250px", alignSelf: "center" }} />
                <Card.Body>
                    <Card.Text>
                        <Form>
                            <>
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
                                        {osobine.map((osob) => {
                                            return(
                                                <tr>
                                                    <td>{osob}</td>
                                                    {[...Array(7)].map((elem, index) => (
                                                        <td><Form.Check inline name={osob} type='radio' id={elem} key={elem} onClick={() => { checkSelected(osob, index, imageKey); }} /></td>
                                                    ))}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
    
    return (
        <>
        { showElement['perSwipe'] ? loopDb(showCard) : ""}
        </>
    );
}

export default PerSwipe;
