'use client'
import React,{useEffect, useState} from 'react'
import { useParams,useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next';
import {  executejava, executepython, sendCode , executecpp,executec} from '@/lib/apis';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-twilight';

export default function Page() {
    const [initalcode, setInitialCode] = useState('')
    const [language, setLanguage] = useState([])
const value = getCookie('code')

const router = useParams()

const {code} = router

const getCode = async() =>{
    const chapter = value && value.split('&&')[0]
    setLanguage(chapter)
    const topic = value && value.split('&&')[1]
    const {data} = await sendCode(chapter, topic, code)
   
   return data  ?  setInitialCode(data) : router.push('/tutorial');
}

const [output, setOutput] = useState('');

const runCode = async () => {
let data ; 
  switch(language){
    case 'python':data =  await executepython(initalcode)
    break;
    case 'c++':data =  await executecpp(initalcode)
    break;
    case 'conly':data =  await executec(initalcode)
    break;
    case 'core-java':data =  await executejava(initalcode)
    break;
    default: return setOutput("Language Not Select") 
  }
   
    return data && setOutput(data.data);

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
            <   div className="input-box">
                  <select name="language" id="" onChange={(e) => setLanguage(e.target.value)} >
                    <option value="core-java">Java</option>
                    <option value="python">Python</option>
                    <option value="c++">C++</option>
                    <option value="conly">C</option>
                  </select>
                </div>
                <button className='rn-btn edu-btn rsp-code-btn' onClick={runCode}>Run Code</button>
                </div>
            {initalcode ? <AceEditor
              mode="javascript" // Set the editor mode
              theme="monokai" // Set the editor theme
              onChange={handleCodeChange} // Set the onChange event handler
              name="code-editor" // Set the editor name
              tabSize={4}
              editorProps={{ $blockScrolling: true }} // Set editor props
              value={initalcode && initalcode} // Set initial editor content
              style={{ width: '100%', height: '70vh' }} // Set editor style
            /> :  <AceEditor
            mode="javascript" // Set the editor mode
            theme="twilight" // Set the editor theme
            onChange={handleCodeChange} // Set the onChange event handler
            name="code-editor" // Set the editor name
            tabSize={4}
            editorProps={{ $blockScrolling: true }} // Set editor props
            value={initalcode} // Set initial editor content
            style={{ width: '100%', height: '70vh' }} // Set editor style
          />   }
           <div className="input-box  pd--10">
                    <label className='w-100' htmlFor="comaamndLineAgrument"> Command Line Argument
                        <input type="text" name="comaamndLineAgrument" id="" />
                    </label>
                    <label className='w-100'  htmlFor="comaamndLineAgrument"> User input
                        <input type="text" name="comaamndLineAgrument" id="" />
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
