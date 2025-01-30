import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser => 
            {
            const userEmail = currentUser?.email || user.email;
            const loggedUser = {email: userEmail};
            setUser(currentUser);
            console.log('Current User', currentUser);
            setLoading(false);
            //if User  exists then issue a token
            if(currentUser){
                
                axios.post('http://localhost:5000/', loggedUser, {withCredentials: true})
                .then(res => {
                    console.log('Token Response', res.data);
                })
            }
            else{
                axios.post('http://localhost:5000/logout', loggedUser, {
                    withCredentials: true
                })
                .then(res =>{
                    console.log(res.data);
                })
            }
        });
        return ()=>{
            return unsubscribe();
        }
    }, [])
    
    

    const authInfo ={
        user,
        loading,
        createUser,
        signIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;