import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import db from "../firebase";
import * as timeago from "timeago.js";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const SidebarChat = ({ id, User, chatName, description }) => {
  const [chatInfo, setChatInfo] = useState([]);
  const history = useHistory();

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  const enterChat = () => {
    history.push({
      pathname: `/chatroom/${id}`,
      state: {
        description: description,
        chatName: chatName,
        User: User,
      },
    });
  };

  return (
    <SidebarChatContainer onClick={enterChat}>
      {/* <Avatar alt={User}>{User}</Avatar> */}
      <Avatar
        alt={chatInfo[0]?.email.charAt(0)}
        src={chatInfo[0]?.email.charAt(0)}
      />
      {console.log(chatInfo[0])}
      <SidebarChatInfo>
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
        </small>
      </SidebarChatInfo>
    </SidebarChatContainer>
  );
};

export default SidebarChat;

const SidebarChatContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;

  :hover {
    background-color: #3e93fd;
    color: white;
  }
`;

const SidebarChatInfo = styled.div`
  margin-left: 15px;
  position: relative;
  width: 100%;

  > small {
    position: absolute;
    top: 3px;
    right: 0;
  }
`;
