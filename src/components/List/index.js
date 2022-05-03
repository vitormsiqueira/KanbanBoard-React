import React from 'react'
import { Container } from './styles';
import Card from '../Card';

import { MdAdd } from 'react-icons/md';

export default function List({ data }) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && <button type="button">
          <MdAdd size={24} color="#fff"/>
        </button>}

      </header>
      <ul>
        { data.cards.map(card => <Card key={card.id} data={card}/> )}
      </ul>
    </Container>
  )
};