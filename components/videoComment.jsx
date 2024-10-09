import { addComent, getComent } from "@/lib/apis";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";

// show comment on post 
export default function CommentsBlock({id}){
  const [edit, setEdit] = useState(-1)
  const [comment, setComment] = useState([]);
  const [commentList, setCommentList] = useState([]);

  const getAllComent = async () => {
    const { data } = id > 0 && await getComent(id);

    return data &&  setCommentList(data); 
}; 

const createComment = async(e) => {
  e.preventDefault()
  if(edit <= 0){
   
     setEdit(0)
    }
  const {data} = await addComent(comment, id, edit)
if(data)
  setComment([])
setEdit(0)
return  getAllComent(id)
}

  const openCommentBox = (id) => {
    if (id != edit)
      setEdit(id);
    else setEdit(-1)
  }


  useEffect(() => {
    getAllComent()
  },[id > 0])

  return (
    <>

<form action="" method="post" onSubmit={createComment} className='form-group'>
                      <input type="text" placeholder='Write Comments' onChange={(e) => setComment(e.target.value)} className='form-control'/>
                      <input type="submit" value="Add" className='edu-btn'/>
                    </form>
                   

      <div className="course-details-card form-group mt--25">
      <div className="row">
      {commentList && commentList.map(
          (ab) =>{ 
            
            if(ab.reply == 0) return (
            <>
            
              <ul style={{marginBottom :'0', paddingBottom : '0'}}>
                <li><div className="col-md-12 d-flex">
                <div className="comment-reply d-flex">
                  <div><Image width={100} height={100} src={ab.image  ? ab.image : "/instructor/course-details/instructor-3.jpg"} alt="Comment Images" /></div>
                  <div>
                    <p className="comment-name">

                    {ab.name}
                    </p>
                    <div className="d-flex ms-2">
                    <p>{ab.comment}</p>
                    <div onClick={(e) => openCommentBox(ab.id)} className="ms-3">
                    <span title="Add a reply off this comment" className="mt-1" >  <FaReply/></span>

                    </div>
                    </div>
                  </div>
                </div>
                
              </div>
                    <ul>
                      <li className="comment-reply-reply">
                      {commentList && commentList.map(
          (re) =>{ 
            
            if(ab.id == re.reply) return (
            <>
              <div className="col-md-12 d-flex">
                <div className="comment-reply d-flex">
                  <div><Image width={100} height={100} src={re.image  ? re.image : "/instructor/course-details/instructor-3.jpg"} alt="Comment Images" /></div>
                  <div>
                    <p className="comment-name">

                    {ab.name}
                    </p>
                    <div className="d-flex ms-2">
                    <p>{re.comment}</p>
                    <div onClick={(e) => openCommentBox(re.id)} className="ms-3">
                    <span title="Add a reply off this comment" className="mt-1" >  <FaReply/></span>

                    </div>
                    </div>
                  </div>
                </div>
                
              </div>
              {edit == re.id &&
                <>
                
                  <form action="" method="post" onSubmit={createComment}>
                      <input type="text" placeholder='Reply On this Comment' onChange={(e) => setComment(e.target.value)} />
                      <input type="submit" value="Add" />
                    </form>
                  
                </>
              }
            </>
            )} )}
                      </li>
                    </ul>
                </li>
              </ul>

           
             
              {edit == ab.id &&
                <>
                
                  <form action="" method="post" onSubmit={createComment} style={{ padding : '10px 60px'}}>
                      <input type="text" placeholder='Reply On this Comment' onChange={(e) => setComment(e.target.value)} />
                      <input type="submit" value="Add" />
                    </form>
                  
                </>
              }

            </>
          )}

        )}
    </div>
      </div>
    
    </>
  );
};
