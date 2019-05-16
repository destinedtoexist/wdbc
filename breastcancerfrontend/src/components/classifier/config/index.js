import React, {useState} from 'react'
import { Card, Button, Form } from 'react-bootstrap';

export default ({variables, onSubmit}) => {

    const [algo, setAlgo] = useState('nb')

    const [vars, setVars] = useState(variables)

    const submitForm = (evt) => {
        evt.preventDefault()
        onSubmit({algo, vars})
    }

    const toggleVar = (variable) => {
        const updatedVars = vars.slice(0)
        const varIndex = vars.indexOf(variable)
        if(varIndex > -1) {
            updatedVars.splice(varIndex, 1)        
        } else {
            updatedVars.push(variable)
        }
        setVars(updatedVars)
    }

    return (
        <Card>
            <Card.Header>The Classifier</Card.Header>
            <Card.Body>
                <Form onSubmit={submitForm}>
                    <Form.Group>
                        <Form.Label>Select Variables</Form.Label>
                        <div>
                        {variables && variables.map((variable, index) => (
                            <div className="form-check form-check-inline" key={'var_'+index}>
                                <input type="checkbox" className="form-check-input" id={'var_'+index} checked={vars.includes(variable)} onChange={() => toggleVar(variable)} />
                                <label className="form-check-label" htmlFor={'var_'+index}>{variable}</label>
                            </div>
                        ))}
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select Classification Algorithm</Form.Label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="algo_nb" checked={algo==='nb'} onChange={()=>setAlgo('nb')} />
                                <label className="form-check-label" htmlFor="algo_nb">
                                    Naive Bayes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="algo_lr" checked={algo==='lr'} onChange={()=>setAlgo('lr')} />
                                <label className="form-check-label" htmlFor="algo_lr">
                                    Logistic Regression
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="algo_svm" checked={algo==='svm'} onChange={()=>setAlgo('svm')} />
                                <label className="form-check-label" htmlFor="algo_svm">
                                    SVM
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="algo_tree" checked={algo==='tree'} onChange={()=>setAlgo('tree')} />
                                <label className="form-check-label" htmlFor="algo_tree">
                                    Decision Tree
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="algo_forest" checked={algo==='forest'} onChange={()=>setAlgo('forest')} />
                                <label className="form-check-label" htmlFor="algo_forest">
                                    Random Forest
                                </label>
                            </div>
                        </div>
                    </Form.Group>
                    <Button type="submit">Select</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}