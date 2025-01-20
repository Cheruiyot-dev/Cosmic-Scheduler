

import './App.css'
import { CssBaseline, Box, Typography } from '@mui/material'

function App() {

  return (
    <Box sx =  {{p:4}}>
      <CssBaseline/>
      <Typography variant = "h3" align = "center" gutterBottom>
        Welcome to Cosmic Scheduler
      </Typography>
      <Typography variant = "subtitle1" align = "center">
        Schedule your appointments with ease
      </Typography>
    </Box>

  )
}

export default App
