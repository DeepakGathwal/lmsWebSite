import React from 'react'
import Link from 'next/link'

export default function Tnc({id, field, setField, errors}){
  return (
    <div className="input-box mb--20">
                                        <input type="checkbox" id={id} name="checkbox" checked={field.checkbox} onChange={(e) => setField({ ...field, checkbox: e.target.checked })} />
                                        <label htmlFor={id}>I accept the <Link href="/termsandcondition" prefetch>Terms &#38; Conditions</Link>.</label>
                                        <br />
                                        {errors.checkbox && <span className="error-message red">{errors.checkbox}</span>}
                                    </div>
  )
}
