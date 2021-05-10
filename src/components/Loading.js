import {Circle} from "better-react-spinkit"
import logo from '../assets/img/arcade.jpeg'
const Loading = () => {
    return (
        <center style={{
            display: "grid",
            placeItems:"center",
            height: "100vh"
        }}>
           <div>
                <img 
                    src={logo}
                    alt="Welcome to Releaf"
                    style={{marginBottom : 40}}
                    height="200"
                />   
                <Circle color="#48549E" size={80}/>
            </div> 
        </center>
    )
}

export default Loading
