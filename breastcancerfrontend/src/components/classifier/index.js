import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Split from './split';
import useSplitDataset from '../../hooks/useSplitDataset';
import Config from './config';
import useSubmitForm from '../../hooks/useSubmitForm';
import Result from './result';

const Classifier = ({variables}) => {
    const [testSize, setTestSize] = useState(null)

    const [stage, setStage] = useState(0)

    const [algoAndVars, setAlgoAndVars] = useState(null)

    const [result, setResult] = useState(null)


    const classificationResponse = useSubmitForm("classifier/classify/", algoAndVars)

    let splitResponse = useSplitDataset(testSize)


    useEffect(() => {
        if(splitResponse) {
            setStage(1)        
        }
        
    }, [splitResponse])

    useEffect(() => {
        if(classificationResponse) {
            const _result = {
                average_precision_score: classificationResponse.average_precision_score,
                confusion: JSON.parse(classificationResponse.confusion),
                precision_recall: JSON.parse(classificationResponse.precision_recall)
            }
            setResult(_result)
        }
        console.log(classificationResponse);
                   
    }, [classificationResponse])


    return (
        <>
            <Row>
                <Col sm={3}><Split splitDataset={(_ts) => setTestSize(_ts)} splitResponse={splitResponse} /></Col>
                {stage>0 && <Col><Config variables={variables} onSubmit={anv => setAlgoAndVars(anv)} /></Col>}
            </Row>
            {result && <Result result={result} />}
        </>
    )
}

export default Classifier