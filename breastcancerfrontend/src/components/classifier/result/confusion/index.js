import React from 'react'
import { Table } from "react-bootstrap";

export default ({confusion}) => {
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Actual Benign</th>
                        <th>Actual Malignant</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Predicted Benign</td>
                        <td>{confusion.Predicted_No.Actual_No}</td>
                        <td>{confusion.Predicted_No.Actual_Yes}</td>
                    </tr>
                    <tr>
                        <td>Predicted Malignant</td>
                        <td>{confusion.Predicted_Yes.Actual_No}</td>
                        <td>{confusion.Predicted_Yes.Actual_Yes}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}