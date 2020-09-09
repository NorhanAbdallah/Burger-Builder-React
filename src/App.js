import React from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'

function App() {
  return (
    <div >
       <Layout>
         <BurgerBuilder />
       </Layout>
    </div>
  );
}

export default App;
