import { Avatar } from "@material-ui/core";
import React, { forwardRef} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Message = forwardRef(
  (
    { id, contents: { timestamp, displayName, email, message, photo, uid } },
    ref
  ) => {

    const [user] = useAuthState(auth);


    //console.log(displayName)
    return (
      <MessageContainer
        ref={ref}
        sender={(user.email === email ) ? (true): (false)}
      >
        <MessagePhoto alt={email?.charAt(0)} src={email?.charAt(0)} sender={(user.email === email ) ? (true): (false)}/>
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </MessageContainer>
    );
  }
);

export default Message;

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: fit-content;
    justify-content: space-between;
    margin: 15px;
    margin-left: ${({sender}) => (sender ? 'auto' : 'none' )};

    > p {
        background-color: ${({sender}) => (sender ? '#3cabfa' : '#f3f3f5' )};
        color: ${({sender}) => (sender ? 'white' : 'black')};
        font-size: medium;
        padding: 15px;
        border-radius: 20px;
        margin: 10px;
        margin-right: auto;
    }

    > small {
        color: gray;
        position: absolute;
        font-size: 8px;
        bottom: -5px;
        right: 0;
    }
`;

const MessagePhoto = styled(Avatar)`
    order: ${({sender}) => (sender ? 1 : 0 )};
    margin: ${({sender}) => (sender ? '15px' : null )};
`;

