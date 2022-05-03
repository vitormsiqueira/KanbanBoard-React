import React from 'react'
import { Container, Label } from './styles';


export default function Card({data}) {
  return (
    <Container>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header> 
      <p>{data.content}</p>
      {data.user && <img src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'/> }
      
    </Container>
  )
}
