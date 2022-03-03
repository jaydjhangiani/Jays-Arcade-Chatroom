import styled from "styled-components";
import chatroom from "../assets/img/chatroom.svg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";

const WelcomeScreen = ({ isOpen, toggle }) => {
  return (
    <WelcomeContainer isOpen={isOpen}>
      <WelcomeHeader>
        <ShowSidebarButton>
          <IconButton>
            <ArrowBackIosIcon onClick={toggle} />
          </IconButton>
        </ShowSidebarButton>
        <h4>Welcome To The Retro Arcade Chat Room</h4>
      </WelcomeHeader>
      <WelcomeImg src={chatroom} />
    </WelcomeContainer>
  );
};

export default WelcomeScreen;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  height: 100vh;
  background-color: white;

  @media screen and (max-width: 768px) {
    flex: 1;
    display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
  }
`;

const WelcomeHeader = styled.div`
  padding: 20px;
  align-items: center;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid lightgray;
  background-color: #f5f5f5;
  height: 30px;
`;

const ShowSidebarButton = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

// const WelcomeBg = styled.div`
//     position: absolute;
//     top:0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     height: 100;
//     overflow: hidden;
// `;

const WelcomeImg = styled.img`
  width: 80%;
  margin: auto;
`;
