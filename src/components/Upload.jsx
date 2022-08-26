import React, {useState} from 'react'
import '../App.css'
import { useMoralisFile } from "react-moralis";

function Upload({logout, contract, user}) {

  const [file, setFile] = useState();
  const [caption, setCaption] = useState();
  let fileUrl;

  const handleFileUpload = async (e) => {
    setFile(e.target.files[0]);
    console.log('file selected');
  }

  const { saveFile, moralisFile } = useMoralisFile();

  const saveFileIPFS = async (f) => {
    console.log("FILE",f)
    const fileIpfs = await saveFile(f.name, file, {saveIPFS: true})
    console.log(fileIpfs._url);
    fileUrl = fileIpfs._url;
  }

  const updateContract = async () =>{
    console.log(fileUrl, caption);
    contract.methods.pushData(fileUrl, caption, user).send({from: user});
  }

  const handleFinal = async () => {

    if(file != null && caption != null) {
      console.log(fileUrl);
      await saveFileIPFS(file);
      updateContract();
      console.log(fileUrl);
    }
    else{
      alert("Please pick a file and add a caption");
    }
  }



  return (
    <div className="Upload">
      <input type="text" onChange={(e) => setCaption(e.target.value)}/>
      <input type="file" onChange={handleFileUpload}/>
      <br/>
      <div className="uploadBtn">
        <button onClick={handleFinal} className="btn up">Upload</button>
        <button onClick={logout} className="btn up">Logout</button>
      </div>
    </div>
  )
}

export default Upload