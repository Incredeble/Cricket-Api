import './App.css';
import Navbar from './Navbar'
import MyCard from './MyCard'
import {getMatches} from './Api'
import { useState , useEffect } from 'react'

function App() {

  const [matches,setMatches] = useState([]);

  useEffect(() => {
    getMatches().then((data) => setMatches(data.matches)).catch((error) => console.log(error))
  },[]);
  return (
    <div className="App">
      <Navbar/>
      <h1>Welcome to my Live Score APi</h1>
      {
        matches.map((match) => ( <div ><MyCard key={match.unique_id} match={match} /></div>))
      }  
    </div>
  );
} 

export default App;
