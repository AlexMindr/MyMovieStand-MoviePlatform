import React,{useState} from 'react'
import Modal  from '@mui/material/Modal';

const ModalView = ({children}) => {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div>ModalView</div>
  )
}

export default ModalView