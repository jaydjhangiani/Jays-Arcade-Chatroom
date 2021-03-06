import { IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useEffect, useRef, useState } from "react";
import {useHistory, useLocation, useParams} from 'react-router-dom';
import styled from "styled-components";
import ChatroomModal from "./ChatroomModal";
import FlipMove from "react-flip-move";
import db, { auth } from "../firebase";
import Message from "./Message";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase';

const Chat = ({toggle, isOpen}) => {
    const endOfMessagesRef = useRef(null);
    const [input, setInput] = useState("");
    const [modalOpen,setModalOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [user] = useAuthState(auth);
    const [chatName, setChatName] = useState();
    const [description, setDescription] = useState();

    const modalToggle = () => {
        setModalOpen(!modalOpen);
    }

    const location = useLocation();
    const history = useHistory();
    const {id} = useParams();

    const scrollToBottom = () => [
        endOfMessagesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    ]

    useEffect(() => {
        if(location.state){
            db.collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
            setMessages(
                snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
                }))
                )
            );
        }
    },[location.state,id])

    const sendMessage = (e) => {
        e.preventDefault();
            if(input === ""){
                alert("Enter Message")
            }
            else{
                db.collection("chats").doc(id).collection("messages").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    message: input,
                    uid: user.uid,
                    photo: user.photoURL,
                    email: user.email,
                    displayName: user.displayName,
                });

                setInput('');
                scrollToBottom();
            }
    }

    useEffect(() => {
        if(location.state){
            setChatName(location.state.chatName)
            setDescription(location.state.description)
        }
        else{
            history.push('/')
        }
    },[location,history])


    return (
        <ChatContainer isOpen={isOpen} >        
        <ChatroomModal modalToggle={modalToggle} modalOpen={modalOpen} chatName={chatName} description={description} />
        <ChatHeader>
            <ShowSidebarButton>
                <IconButton onClick={toggle}>
                    <ArrowBackIosIcon />
                </IconButton>
            </ShowSidebarButton>
            <ContentWrapper>
                <h4>
                    To: <span>{chatName}</span>
                </h4>
                <ChatDetails onClick={modalToggle} >Details</ChatDetails>
            </ContentWrapper>
        </ChatHeader>
        
        <ChatMessage>
          <FlipMove>
              {messages.map(({ id, data }) => (
                    <Message key={id} contents={data} />
              ))}
            </FlipMove>
            <EndOfMessage ref={endOfMessagesRef}/>
        </ChatMessage>

        
        
        <ChatInput>
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your message."
              type="text"
            />
            <button onClick={sendMessage}>Send Message</button>
          </form>
  
          <IconButton>
            <SendIcon  className="chat__mic" />
          </IconButton>
        </ChatInput>
        
      </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.65;
    height: 100vh;
    background-color: white;

    @media screen and (max-width:768px){
        flex: 1;
        display:${({isOpen}) => (isOpen ? 'none' : 'flex')};
    }
`;

const ChatHeader = styled.div`
    padding: 20px;
    align-items: center;
    display: flex;
    border-bottom: 1px solid lightgray;
    background-color: #f5f5f5;
    height: 30px;
`;

const ShowSidebarButton = styled.div`
    display: none;

    @media screen and (max-width:768px){
        display: block;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;

    > h4{
        font-weight: 500;
        color: gray;
    }
`;

const ChatDetails = styled.strong`
    cursor: pointer;
`;

const ChatMessage = styled.div`
    flex: 1;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar{
        display: none;
    }
`;

const ChatInput = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-top: 1px solid lightgray;
    background-color: #f5f5f5;

    > form {
        flex: 1;
    }

    > form > input {
        width: 98%;
        outline-width: 0;
        border: 1px solid lightgray;
        border-radius: 999px;
        padding: 5px;
    }

    > form > button {
        display: none; 
    }
`;

const EndOfMessage = styled.div`
    margin-bottom: 80px;
`