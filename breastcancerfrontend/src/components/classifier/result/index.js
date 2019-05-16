import React, { useEffect } from 'react'
import { Row, Col, Card } from "react-bootstrap";
import Confusion from "./confusion";
import PrecisionRecallCurve from './precision_recall_curve';

export default ({result}) => {
    useEffect(() => {
        console.log(result);
        
    })
    return (
        <Row>
            <Col xs={4}>
                <Card>
                    <Card.Header>Confusion Matrix</Card.Header>
                    <Confusion confusion={result.confusion} />
                    <Card.Body>
                        <Card.Text>*Average Precision Score: {result.average_precision_score.toFixed(3)}</Card.Text>
                        <Card.Text><small>** Yes: Malignant, No: Benign</small></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={8}>
                <Card>
                    <Card.Header>Precision-Recall Curve</Card.Header>
                    <PrecisionRecallCurve precision_recall={result.precision_recall} />
                </Card>
                
            </Col>
        </Row>
    )
}