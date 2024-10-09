import { getTimeStamps } from '@/lib/apis'
import React, { useState, useEffect } from 'react'

export default function TimeStamps({ id, videoObj }){
    const [posts, setPosts] = useState([])

    const allData = async () => {
        const { data } = id > 0 && await getTimeStamps(id) 
  
        return data && setPosts(data)
    }

    useEffect(() => {
        allData()
    }, [id > 0])


    const convertTimeInotNumber = async (time) => {
        var breakTime = time.split(":");
        if (breakTime.length > 2) {
            const hours = parseInt(breakTime[0] * 60)
            const minutes = parseInt(parseInt(breakTime[1] * 60) + parseInt(hours * 60))
            const seekTime = parseInt(minutes) + parseInt(breakTime[2])
            return videoObj.seek(seekTime)
        } else {
            const minutes = parseInt(breakTime[0] * 60)
            const seekTime = parseInt(minutes) + parseInt(breakTime[1])
        
            return videoObj.seek(seekTime)
        }

    }


    return (
        <>

            <div className="course-details-card">
                <table className="rwd-table">
                    <tbody>


                        {posts && posts.map((ab, i) => (
                            <tr key={i}>
                                <td>{ab.name}</td>
                                <td><button onClick={() => convertTimeInotNumber(ab.time)}>{ab.time}</button></td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

        </>
    )
}
