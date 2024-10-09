'use client'
import React,{useEffect, useState} from 'react'
import { useParams } from 'next/navigation'
import { getCookie } from 'cookies-next';
import {  executejava,  sendCode } from '@/lib/apis';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-twilight';

export default function Page () {
    const [initalcode, setInitialCode] = useState('')
    const [commandLineinput, setCommandLineInput] = useState([])
    const [getInput, setGetInput] = useState([])
  
const value = getCookie('code')


const router = useParams()

const {code} = router

const getCode = async() =>{
    const chapter = value && value.split('&&')[0]
    const topic = value && value.split('&&')[1]
    const {data} = await sendCode(chapter, topic, code)
   
   return data  ?  setInitialCode(data) : router.push('/tutorial');
}

const [output, setOutput] = useState('');

const runCode = async () => {

   const {data} = await executejava(initalcode, commandLineinput, getInput)
    setCommandLineInput([])
    setGetInput([])
    return data && setOutput(data);

  };

const handleCodeChange= (newCode) => {
 return setInitialCode(newCode);
}

useEffect(() => {
    getCode()
},[value,code])


  return (
    <>
      <div className='d-flex w-100'>
        <div className='col-md-6 col-12 pd--10'>
        <div className="checkout-page-style2 d-sm-block d-lg-flex justify-content-between m-3">
            {/* <   div className="input-box">
                  <select name="language" id="" onChange={(e) => setLanguage(e.target.value)} >
                    <option value="core-java">Java</option>
                    <option value="python">Python</option>
                    <option value="c++">C++</option>
                    <option value="conly">C</option>
                  </select>
                </div> */}
                <button className='rn-btn edu-btn rsp-code-btn' onClick={runCode}>Run Code</button>
                </div>
            {initalcode ? <AceEditor
              mode="javascript" // Set the editor mode
              theme="monokai" // Set the editor theme
              onChange={handleCodeChange} // Set the onChange event handler
              name="code-editor" // Set the editor name
              tabSize={4}
              setOptions={{
                useWorker: false, 
                wrap: true, // Disable word wrap
            }}

              editorProps={{ $blockScrolling: true }} // Set editor props
              value={initalcode && initalcode} // Set initial editor content
              style={{ width: '100%', height: '71vh' }} // Set editor style
            /> :  <AceEditor
            mode="javascript" // Set the editor mode
            theme="twilight" // Set the editor theme
            onChange={handleCodeChange} // Set the onChange event handler
            name="code-editor" // Set the editor name
            tabSize={4}
            editorProps={{ $blockScrolling: true }} // Set editor props
            value={initalcode} // Set initial editor content
            style={{ width: '100%', height: '71vh' }} // Set editor style
          />   }
           <div className="input-box  pd--10">
                    <label className='w-100' htmlFor="comaamndLineAgrument"> Command Line Argument
                        <input type="text"  name="commandLineinput" id="" value={commandLineinput} onChange={(e) => setCommandLineInput(e.target.value)} />
                    </label>
                    <label className='w-100'  htmlFor="comaamndLineAgrument"> User input
                        <input type="text" name="getInput" id=""   value={getInput} onChange={(e) => setGetInput(e.target.value)}/>
                    </label>
                </div>
        </div>
        <div className='col-md-6 col-12 code-output pd--10'>
        <h3 className='m-3'>Output</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </>
  )
}
