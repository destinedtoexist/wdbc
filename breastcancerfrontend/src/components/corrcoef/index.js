import React from 'react'

import {Card, Table} from 'react-bootstrap'
import useFetch from '../../hooks/useFetch';

export default function({features}) {
    let corrcoef = useFetch('insights/corrcoef/')
    return (
        <Card>
            <Card.Header>Correlation Coefficients</Card.Header>
            <Table responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        {features.map(f => <th key={f}>{f}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {corrcoef && Object.keys(corrcoef).map(c1 => (
                        <tr key={c1}>
                            <td>{c1}</td>
                            {features.map((f, i) => <td key={f+'_'+i}>{corrcoef[c1][f].toFixed(3)}</td>)}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    )
}