import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap'

import Dataset from './components/dataset'


import useFetch from './hooks/useFetch'
import Corrcoef from './components/corrcoef';
import Classifier from './components/classifier';


function App() {

  let dataset = useFetch('dataset/', {})

  return (
    <Container fluid={true}>
      <Classifier variables={dataset.features} />
      <Row>
        <Col xs={4}>
          <Dataset dataset={dataset}/>
        </Col>
        <Col xs={8}>
          <Corrcoef features={dataset.features || []} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
