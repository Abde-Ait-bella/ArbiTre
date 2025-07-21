import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(
        () => {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        }
    );
    
    const  [club_1, setClub_1] = useState();
    const  [club_2, setClub_2] = useState();
    const  [club_1_update, setClub_1_update] = useState();
    const  [club_2_update, setClub_2_update] = useState();

    const club_1_Option = (dataClub) => {
        setClub_1(dataClub)
        console.log("club_1Context", dataClub);
        
    }

    const club_2_Option = (dataClub) => {
        setClub_2(dataClub)
    }

    const club_1_Option_update = (dataClub) => {
        setClub_1_update(dataClub)
    }

    const club_2_Option_update = (dataClub) => {
        setClub_2_update(dataClub)
    }

    const userDataLogin = (dataUser) => {
        setUser(dataUser)
        localStorage.setItem('user', JSON.stringify(dataUser));
    }

    const updateUserData = (updatedUserData) => {
        const updatedUser = { ...user, ...updatedUserData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
    }

    const userDataLogout = () => {
        setUser(null)
        localStorage.removeItem('user');
        localStorage.removeItem('AUTHENTICATED');
        localStorage.removeItem('token');
        
        return true;
    }

    return (
        <>
            <AuthContext.Provider value={{ 
                userDataLogin, 
                user, 
                userDataLogout, 
                updateUserData,
                club_1_Option, 
                club_2_Option, 
                club_1, 
                club_2, 
                club_1_Option_update, 
                club_2_Option_update, 
                club_1_update, 
                club_2_update 
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const AuthUser = () => {
    return useContext(AuthContext);
}