'use client'

import ToDoApp from "@/components/TodoApp";
import { Box, Container } from "@mui/material";
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Background = ({ children }: Props) => {
  return (
    <Box
      style={{
        background: 'rgb(6, 179, 205)',
        backgroundImage: `linear-gradient(321deg, rgba(6,179,205,1) 0%, rgba(118,118,187,1) 33%, rgba(0,212,255,1) 100%)`,
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        zIndex: -1,
      }}
    >
      {children}
    </Box>
  )
}
const Home = () => {
  return (
    <Background>
      <ToDoApp />
    </Background>
  );
};

export default Home;
