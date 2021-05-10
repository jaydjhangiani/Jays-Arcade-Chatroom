// import { auth } from '../firebase';
// import {useAuthState} from 'react-firebase-hooks/auth';
// import {useCollection} from 'react-firebase-hooks/firestore';
import Sidebar from './Sidebar';
import Chat from './Chat';
import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';

const Chatroom = ({personal}) => {
    // const [user] = useAuthState(auth);
    const [isOpen,setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const {id} = useParams();
    return (
        <ChatroomContainer>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            {id ? (
            <>
                <Chat isOpen={isOpen} toggle={toggle} />
            </>
            ) : (
                <WelcomeScreen isOpen={isOpen} toggle={toggle} />
            )}
        </ChatroomContainer>
    )
}

export default Chatroom

const ChatroomContainer = styled.div`
    display: flex
`;