import React from 'react';
import EditorPage from './pages/EditorPage'
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
   <RecoilRoot>
      <EditorPage/>
   </RecoilRoot>
  );
}

export default App;
