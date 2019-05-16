import React, { Fragment } from 'react'

import {Card, Table} from 'react-bootstrap'


export default function ({dataset}){
    let shape = dataset.shape
    let summary  = dataset.summary ? JSON.parse(dataset.summary) : null
    let summary_attrs = summary ? Object.keys(summary.radius).slice(1) : []
    return (
        <Fragment>
            <Card>
                <Card.Header>Summary</Card.Header>
                <Card.Body>
                    <Card.Text>The current dataset has {shape ? shape[1] : 0} columns ({shape ? shape[1]-2 : 0} features + ID + Diagnosis) over {dataset.shape ? dataset.shape[0] : 0} records</Card.Text>
                </Card.Body>
                <Table responsive size="sm"> 
                    <thead>
                        <tr>
                            <th>Column Name</th>
                            {summary && summary_attrs.map(key => <th key={key}>{key}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {summary && Object.keys(summary).map((key, index) => (
                            <tr key={key}>
                                <td>{index+1}. {key}</td>
                                {summary_attrs.map(attr => <td key={attr}>{summary[key][attr].toFixed(3)}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Fragment>
    )
}