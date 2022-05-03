import React, { useRef, useContext } from 'react'
import { Container, Label } from './styles';
import { useDrag, useDrop } from 'react-dnd';

import Boardcontext from '../Board/context';

export default function Card({ data, index, listIndex }) {

  // Esse Hook permite passar mais de uma referência
  const ref = useRef();
  // Aqui obtemos o contexto
  const { move } = useContext(Boardcontext);

  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: { index, type: "card", listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  // Aqui precisamos das referencias do Card selecionado (item.id) e
  // do Card que queremos trocar de lugar (data.id)
  const [, dropRef] = useDrop({
    accept: "card",
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      if(draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return ;
      }

      // As inserções seguirão um conceito de inserção "abaixo" (significa que iremos inserir o card arrastado abaixo do card hover)
      // e inserção "acima" (inserção do card arrastado acima do card hover).

      // Retorna o tamanho do Card
      const targetSize = ref.current.getBoundingClientRect();
      // Retorna o pixel verical central do Card (usaremos p/ definir se o card será inserido antes ou após)
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;


      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      // Verifica se o card arrastado foi movido para a posição de inserção "acima"
      // e se a sua posição atual ja se encontra acima do card hover, nada deverá ocorrer
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return ;
      }

      // Semelhante ao anterior, previne que um Card que ja se encontra abaixo da inserção do card hover
      // e que foi movido para a inserção "abaixo"
      if(draggedIndex > targetIndex && draggedTop > targetCenter) {
        return ;
      }

      move( draggedListIndex, targetListIndex, draggedIndex, targetIndex );

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container className="card" ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header> 
      <p>{data.content}</p>
      {data.user && <img src={data.user}/> }
      
    </Container>
  )
}
