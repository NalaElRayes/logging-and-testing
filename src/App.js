import './App.css';
import 'fontsource-roboto'; 
import { Typography } from '@material-ui/core';
import FetchAPI from './components/FetchApi';



function App() {
  return (
    <div className="App">
      <FetchAPI></FetchAPI>
      <Typography>Hello</Typography>
      
    </div>
  );
}

export default App;
