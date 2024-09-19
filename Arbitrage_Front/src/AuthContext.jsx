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

    const club_1_Option = (dataClub) => {
        setClub_1(dataClub)
            console.log(dataClub);
    }

    const club_2_Option = (dataClub) => {
        setClub_2(dataClub)
    }

    const userDataLogin = (dataUser) => {
        setUser(dataUser)
        localStorage.setItem('user', JSON.stringify(dataUser));
    }

    const userDataLogout = () => {
        setUser(null)
        localStorage.removeItem('user');
        localStorage.removeItem('AUTHENTICATED');
        localStorage.removeItem('token');
        navigate('/login')
    }


    return (
        <>
            <AuthContext.Provider value={{ userDataLogin, user, userDataLogout, club_1_Option, club_2_Option, club_1, club_2 }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const AuthUser = () => {
    return useContext(AuthContext);
};