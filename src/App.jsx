import { useState ,useCallback,useEffect,useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setnumberAllowed]= useState(false)
  const [charAllowed,setcharAllowed]= useState(false)
  const [password,setPassword] = useState ()
  const passwordRef= useRef(null)
  const [isCopied,setisCopied]=useState(false)

  const passwordGenerator =  useCallback(()=>{
    let pass=""
    let strg="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)
    {
      strg+="0123456789"
    }
    if(charAllowed)
    {
      strg+="!@#$%^&*()-=_+[]'{}|;:"
    }
    for (let index = 1; index <=length; index++) {
      let char =Math.floor(Math.random()*strg.length+1)
      pass+= strg.charAt(char)
      setPassword(pass)
      
    }
    setisCopied(false);
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
    setisCopied(true);
  },[password])

  useEffect(()=>
  {
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator]
  )
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 text-center py-4 my-8 text-yellow-500 bg-gray-700' >
        <h1 className='text-white text-center'>
          Password Generator
        </h1>
        
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
           <input 
           type="text"
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='password'
           readOnly
           ref={passwordRef}
           />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-pink-700 px-3 text-white shrink-0 py-0.5 ' >
            {isCopied?'Copied':'Copy'}
          </button>

        </div>
        <div className='flex text-sm gap-x-2'>
           <div className='flex items-center gap-x-1'>
             <input 
             type="range" 
             min={6}
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>{setLength(e.target.value)}}
             />
             <label> Length:{length}</label>
           </div>
           <div>
            <input 
            type="checkbox" name="Numbers" defaultChecked={numberAllowed} 
            onChange={()=>{setnumberAllowed((prev)=>!prev)}}
            />
            <label htmlFor="numberInput">Numbers</label>
           </div>
           <div>
            <input 
            type="checkbox" name="Characters" defaultChecked={charAllowed} 
            onChange={()=>{setcharAllowed((prev)=>!prev)}}
            />
            <label htmlFor="CharInput">Characters</label>
           </div>
        </div>
        
      </div>
    </>
  )
}

export default App
// after refresh it shpuld be conserved i have to add one tool like this
