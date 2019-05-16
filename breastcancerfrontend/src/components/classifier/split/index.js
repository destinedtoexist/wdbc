import React, {useState} from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

export default function({splitDataset, splitResponse}) {
    const [testSize, setTestSize] = useState(20)

    const handleSubmit = (evt) => {
        evt.preventDefault()
        splitDataset(testSize)
    }

    return (
        <Card>
            <Card.Header>Split Data Set</Card.Header>
            <Card.Body>
                <Card.Text>Split the original dataset into training and test datasets.</Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Test Data Size (%)</Form.Label>
                    <Row className="align-items-end">
                        <Col sm={6}>     
                        <Form.Control type="number" value={testSize} onChange={(e) => setTestSize(e.target.value)} />
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">Split</Button>
                        </Col>
                    </Row>
                </Form>
                {splitResponse && <Card.Text>Splitting complete. <br />
                    <small>
                        Rows in Training dataset: {splitResponse.train} <br />
                        Rows in Testing dataset: {splitResponse.test}
                    </small>
                </Card.Text>}
            </Card.Body>
        </Card>
    )
}