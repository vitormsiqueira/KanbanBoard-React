import React, { useState } from 'react'
import produce from 'immer';
import { loadLists } from '../../services/api';
import { Container } from './styles';
import List from '../List';


import BoardContext from './context';

const data = loadLists();

export default function Board() {

  const [lists, setLists] = useState(data);

  function move( fromList, toList, fromIndex, toIndex ) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[fromIndex];

      draft[fromList].cards.splice(fromIndex, 1);
      draft[toList].cards.splice(toIndex, 0, dragged);
    }))
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  )
}
