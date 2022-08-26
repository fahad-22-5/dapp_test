import React, {useState, useEffect} from 'react'
import Upload from './Upload'
import Web3 from 'web3';
import Post from './Post'
import Manager from './Manager'
import '../App.css'

function Feed({logout, user}) {
  
  
  const [linkDb, setLinkDb] = useState();
  const [capsDb, setCapsDb] = useState();
  const [usersDb, setUsersDb] = useState();
  const [isData, setIsData] = useState(false);
  const [title, setTitle] = useState('Refresh Feed');


  const web3 = new Web3(Web3.givenProvider);


  let abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "inpLink",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "inpCaption",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "inpUser",
          "type": "string"
        }
      ],
      "name": "pushData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "captions",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCaptions",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLinks",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUsers",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "links",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const contAdd = "0xEf3d4BE4B6b9Ea8ED2E1FAAE30dd9bfC33cFed49";

  var contract = new web3.eth.Contract(abi, contAdd);
  async function getContract(){

    setTitle("Getting Data");

    contract.methods.getLinks().call().then(function(result){
      setLinkDb(result);
    });
    contract.methods.getCaptions().call().then(function(result){
      setCapsDb(result);
    });
    contract.methods.getUsers().call().then(function(result){
      setUsersDb(result);
    })

    console.log('Getting Data, wait for 10 secs');

  }


  
  setTimeout(print, 10000);
  
  function print(){
    console.log(linkDb);
    console.log(capsDb);
    console.log(usersDb);

    if(linkDb != undefined){
      setTitle("Data Received!");
      setIsData(true);
    }
  }


  return (
    <div className="Feed">
        <Upload logout = {logout} contract = {contract} user = {user}/>

        <br/> 
        <br/> 
        <br/> 
        
        <button onClick = {getContract} className="btn">{title}</button>

        {isData ? <Manager linkDb = {linkDb} capsDb = {capsDb} usersDb = {usersDb}/> : <p>Click to Refresh Feed</p>}
          
    </div>
  )
}

export default Feed