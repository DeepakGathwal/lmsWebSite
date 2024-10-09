import React from 'react'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';

export default function Editor (props) {
  const {display, mode, value, onChange} = props
  
  return (
    <div className="col-6">
    <h6>{display}</h6>
    <AceEditor
      mode={mode}
      theme="monokai"
      name={`${mode}-editor`}
      value={value}
      onChange={(newValue) => onChange(newValue)}
      editorProps={{ $blockScrolling: true }}
      width="100%"
      height="35em"
    />

    </div>
  )
}

