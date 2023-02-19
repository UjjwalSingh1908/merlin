import './App.css';
import logo from './assets/logo.svg'
import enter from './assets/enter.svg'
import arrowl from './assets/arrow-left.svg'
import arrowr from './assets/arrow-right.svg'
import copy from './assets/copy.svg'
import refresh from './assets/refresh.svg'
import { useState } from 'react';



function App() {

  const [query, setQuery ] = useState(null);
  const [result, setResult] = useState([]);
  const [active, setActive] = useState(0); //to navigate through multiple results


//SSE endpoint used to fetch results
   const handleSearch = (e) => {
   let r = [...result];
    if(e.key === 'Enter'){
    const sse = new EventSource(`https://take-home-endpoints-yak3s7dv3a-el.a.run.app/sse`);

    sse.onmessage = e => {
      const d = JSON.parse(e.data).choices;

      d.forEach((elem, ind) => {
        
       if(ind >= r.length) r.push(elem.text); 
        else r[ind] = r[ind] + elem.text;
      });
      
      
      // console.log(r);
      setResult([...r]);

    };

    sse.onerror = (err) => {
    console.log(err);
    sse.close();
  }
}
  }

  



  return (
    <div className="App">
      <div className='h1' >
        <img src={logo} />
      Merlin
      </div>
      <p className='h2'> 
      Unleash the power of creativity with Merlin, the ultimate tool for marketers! Say goodbye  
      </p>

      <div className='search' >
        <input type="text" placeholder='Ask merlin' onChange={(e)=> setQuery(e.target.value)} onKeyDown={(e)=> { setResult(result.splice(0,result.length)); handleSearch(e)}} />
        <img src={enter} className='enter' />
      </div>

      <div className='results' >
      <div className='results-header' >
        <div>Merlin Says:</div>
        <div className='icons' >
          <div className='arrows' >
          <img className='arrowl' src={arrowl} onClick={() => active == 0 ? setActive(result.length -1 ): setActive(active-1) } />
          <img className='arrowr' src={arrowr}  onClick={() => setActive((active+1)%result.length) }  />
          </div>
          <img className='icon' src={refresh} />
          <img className='icon' src={copy}  onClick={() => {navigator.clipboard.writeText(result)}} />
        </div>

      </div>
      <div className='content' >
        {result[active]}
      </div> 
      </div>
     
    </div>
  );
}

export default App;
