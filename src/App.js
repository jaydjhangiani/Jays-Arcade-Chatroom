import Login from './components/Login';
import './App.css';
import {useEffect} from 'react';
import db, { auth } from './firebase';
import Chatroom from './components/Chatroom';
import {useAuthState} from 'react-firebase-hooks/auth' 
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loading from './components/Loading';


function App() {

  const [user,loading] = useAuthState(auth)

  useEffect(() => {
    if(user){
      db.collection('users').doc(user.uid).set({
        email: user.email,
        // lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
      },
      {merge: true})
    }
  },[user])

    if(loading) return <Loading />

    if(!user) return <Login />

    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Chatroom} />
            <Route exact path="/chatroom/:id" component={Chatroom} />
          </Switch>
        </BrowserRouter>
    ) 

}

export default App;
