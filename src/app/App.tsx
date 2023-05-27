import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TodolistsLists} from "../features/Todolists/TodolistsLists";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./store";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {useCallback, useEffect} from "react";
import {initializedAppTC} from "./app-reducer";
import { logoutTC } from '../features/Login/auth-reducer';
import {Error404} from "../components/404/error404";


function App() {
    const dispatch=useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const initialized = useAppSelector(state => state.app.initialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    useEffect(()=>{
        dispatch(initializedAppTC())
    },[])
    const logoutHandler =useCallback( () => {
        dispatch(logoutTC())

    },[])
    if (!initialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">

                <Toolbar  style={{display:'flex',justifyContent:'space-between'}}>
                   {/* <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>*/}
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    {isLoggedIn&&< Button onClick={logoutHandler} variant={"contained"} color={"secondary"}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsLists/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<Error404/>}/>
                    <Route path={'/todolist'} element={<Navigate to={'/'}/>}/>
                    <Route path={'*'} element={<Navigate to={'todolist/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;

