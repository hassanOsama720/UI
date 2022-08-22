import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import { useSocket } from "../../components/SocketProvider";


export default function Start(props) {
    const [cookies, setCookie , removeCookie] = useCookies(["config"]);
    const socket = useSocket();
    const nav = useNavigate()
    function handelSocket (){
        props.socket.send(cookies.config.username)
    }
    useEffect(()=>{
        socket.onmessage = function(event) {
            console.log(JSON.parse(event.data));
          }
    })
  return (
    <div className="container p-0 fluid vh-100 d-flex flex-column align-items-center  flex-wrap" style={{backgroundColor:"orange"}}>
        <div className="head w-100 mb-4 rounded-bottom d-flex justify-content-evenly align-items-center" style={{height:"8%",backgroundColor:"orange"}}>
            <h3 style={{color:"#617C95"}}>Trivia Game</h3>
        </div>
        <div className="container p-0 fluid w-100  d-flex flex-column justify-content-evenly align-items-center flex-wrap" style={{backgroundColor:"orange",height:"85%"}}>
        {cookies.config.camera? <div className="camera rounded-4 " style={{width:"90%",height:"40%",border:"solid 1px white",overflow:"hidden"}}>
            <Webcam style={{width:"100%",height:"100%",objectFit: "cover"}} />
            </div> : <div></div>}
            <div className=" w-100 flex-column d-flex justify-content-evenly align-items-center" style={{height:"55%"}}>
                <h1 style={{fontSize:"70px"}} onClick={()=>{nav("/game")}}>Start</h1>
                <h5 style={{color:"#555"}}>لعبة سؤال و جواب</h5>
                <h5 style={{color:"#555"}}>اول لعبة ثقافية تفاعلية مع المتابعين</h5>
                <h5 style={{color:"#555"}}>لتشارك معنا اجب عن السؤال بالتعليقات</h5>
                <h5 style={{color:"#555"}}>باضافه الهاشتاج {cookies.config.hashtag}</h5>
                <h5 style={{color:"#555"}}>ثم رقم الجواب </h5>
                <h5 style={{color:"#555"}}>اللعبه ستبدا قريبا</h5>
            </div>
            <button  onClick={handelSocket} className='w-50 rounded-pill' style={{height:"50px",border:"none",backgroundColor:"#617C95",color:"white",fontWeight:"bold",fontSize:"large"}} name='signUp'>Reconnect</button> 

        </div>
    </div>
  )
}
