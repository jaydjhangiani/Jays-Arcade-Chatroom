import styled from "styled-components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Avatar, IconButton } from "@material-ui/core";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
// import SearchIcon  from '@material-ui/icons/Search'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import db from "../firebase";
import { useEffect, useState } from "react";
import SidebarChat from "./SidebarChat";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = ({ isOpen, toggle }) => {
  const [user] = useAuthState(auth);
  const [User, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    db.collection("users")
      .where("email", "==", user.email)
      .onSnapshot((snapshot) =>
        setUser(snapshot.docs.map((doc) => doc.data().username))
      );
  }, [user]);

  const addChat = () => {
    const chatName = prompt("Please enter a chat room name ");
    const chatDesc = prompt("Please enter chat room description");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
        description: chatDesc,
      });
    }
  };

  const userChatRef = db.collection("chats");
  const [chatSnapshot] = useCollection(userChatRef);

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <SidebarHeader>
        <SidebarAvatar
          onClick={() => auth.signOut()}
          alt={User ? User[0]?.charAt(0) : null}
          src={User ? User[0]?.charAt(0) : null}
        />
        <div className="sidebar__input">
          {/* <SearchIcon /> */}
          {/* <input placeholder = "Search" /> */}
          {User}
        </div>
        <IconButton
          className="sidebar__inputButton"
          variant="outlines"
          onClick={addChat}
        >
          <RateReviewOutlinedIcon />
        </IconButton>
        <SidebarIcon variant="outlined">
          <ArrowBackIosIcon />
        </SidebarIcon>
      </SidebarHeader>
      <SidebarChats>
        {chatSnapshot?.docs.map((chat) => (
          <SidebarChat
            key={chat.id}
            id={chat.id}
            User={User}
            chatName={chat.data().chatName}
            description={chat.data().description}
          />
        ))}
      </SidebarChats>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  flex: 0.35;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-right: 1px solid lightgray;

  @media screen and (max-width: 768px) {
    flex: 1;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 50px;
  background-color: white;
  justify-content: space-around;
`;

const SidebarAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 10px;
`;

const SidebarIcon = styled(IconButton)`
  display: none !important;

  @media screen and (max-width: 768px) {
    display: block !important ;
  }
`;

const SidebarChats = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
