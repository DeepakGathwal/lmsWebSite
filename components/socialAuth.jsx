import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { FaGithub,FaGoogle, FaLinkedinIn } from 'react-icons/fa';


export default function SocialAuth(){
  return (
    <div className="social-media">
                <a  className="social-icon"  onClick={() => signIn('github')}>
                  <FaGithub />
                </a>
                <a  className="social-icon" onClick={() => signIn('google')}>
                  <FaGoogle />
                </a>
                <a  className="social-icon"  onClick={() => signIn('linkedin')}>
                  <FaLinkedinIn />
                </a>
              </div>
  )
}

