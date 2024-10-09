'use client'
import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation'
import JavaScriptEditor from '@/components/javaScriptEditor';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import { sendCode } from '@/lib/apis';
import parse from 'html-react-parser';

export default function Editor() {
  const [htmlCode, setHtmlCode] = useState('<h1>Hello, World!</h1>');
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        ${htmlCode}
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [htmlCode])

const value = getCookie('code')

const router = useParams()

const {code} = router

const getCode = async() =>{
  const chapter = value && value.split('&&')[0]
  const topic = value && value.split('&&')[1]
  const {data} = await sendCode(chapter, topic, code)
  return data  ?  setHtmlCode(parse(data)) : router.push('/tutorial');
}

useEffect(() => {
  getCode()
},[value,code])


  return (
    <div className='container-fluid'>
      <div className='row'>
        <JavaScriptEditor display={"Code"} mode={'html'} value={htmlCode} onChange={setHtmlCode}/>
       <div className="col-6 pane">
       <h6>OutPut</h6>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      </div>
    </div>
  );
};
