import React, { useState } from 'react'

export default function Img() {
    const [image, setImage] = useState("");
    const submitImage = ()=>{
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","E-commerce website");
        data.append("cloud_name","dntxis6xz");
        fetch("https://api.cloudinary.com/v1_1/dntxis6xz/image/upload",{
            method:"post",
            body:data
        }
        ).then((res)=>res.json()).then((data)=>{
            console.log(data);
            alert("cloudinary image uploaded");
        }).catch((err)=>{
            console.log(err, "cloudinary error");
        })

    }



  return (
    <div>
       <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      <button onClick={submitImage}> upload image</button>
  
    </div>
  )
}

