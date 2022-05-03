import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import GlobalStyle from "./styles/global";

import Header from "./components/Header";
import Board from './components/Board';

import database from './services/firebase';
import { ref, child, get} from "firebase/database";

function App() {

  const dbRef = ref(database);
  const cardId = 2;

  get(child(dbRef, `tasks/cards/${cardId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Header/>
      <Board/>
      <GlobalStyle/>
    </DndProvider>
  );
}

export default App;
