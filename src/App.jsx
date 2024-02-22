import './App.css';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Loader from './components/Loader';
import MainRoutes from "./routing/MainRoutes";
function App() {
  const [isLoading ,setIsLoading] = useState(true);
  useEffect(() => {

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (

   <>
     {isLoading ? <Loader /> : (
      <>
     <Toaster/>
      <MainRoutes/>
    </>
    )}

   </>
     
  );
}

export default App;