import { useState ,useCallback, useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number,setNumber]=useState(false)
  const [char,setChar]=useState(false)
  const [Password,setPassword]=useState('')
  //ref hook
  const passwordRef=useRef(null)
  const passwordGenerator= useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNKOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(number)str +="0123456789";
    if(char)str +='@#$%^&*!~?<>';
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
    }
    setPassword(pass)
  },[length,number,char,setPassword])
  useEffect(()=>{
    passwordGenerator()
  },[length,number,char,passwordGenerator])
  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,22)
    window.navigator.clipboard.writeText(Password)
  },
  [Password])
  return (
    <>
    <div className='w-full max-w-md mx-auto  shadow-md  rounded-lg bg-gray-800 text-orange-500 '>
    <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 '> 
    <input type="text"
    value={Password}
    className='outline-none w-full py-1 px-3'
    readOnly
    placeholder='password'
    ref={passwordRef}
     />
     <button
     onClick={copyPasswordToClipboard} className='border-none bg-blue-700 text-white px-3 py-1  shrink-0'> Copy</button></div>
     <div className="flex text-sm gap-x-2 ">
      <div className="flex items-center gap-x-1 ">
        <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer '
          onChange={(e)=>{setLength(e.target.value)}}
        />
        <label className='px-2'>Length:{length}</label>
      </div>
      <div className='flex intes-center gap-x-1'>
        <input type="checkbox"
          defaultChecked={number}
          id='numberInput'
          onChange={()=>{
            setNumber((prev)=>!prev)
          }}
          
         />
         <label htmlFor="numberInput">Number</label>
      </div>
      <div className='flex intes-center gap-x-1'>
        <input type="checkbox"
          defaultChecked={number}
          id='characterInput'
          onChange={()=>{
            setChar((prev)=>!prev)
          }}
          
         />
         <label htmlFor="numberInput">Characters</label>
      </div>
     </div>
    </div>
    </>
  )
}

export default App
