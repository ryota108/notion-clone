import React from "react";
import { Drawer, List, ListItemButton,Box, Typography, IconButton } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/Logout"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import assets from "../../assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.value );
  const logoutHandler = () =>{
    // tokenを削除している
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
<List sx={{width:250,height:"100vh",backgroundColor:assets.colors.secondary}}>
  <ListItemButton>
    <Box
    sx={{
      width:"100%",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between"
    }}
    >
   <Typography variant="body2" fontWeight="700">
    {user.username}
   </Typography>
   <IconButton onClick={logoutHandler}>
    <LogoutOutlinedIcon/>
   </IconButton>
    </Box>
  </ListItemButton>
  <Box sx={{paddingTop:"10px"}}></Box>
  <ListItemButton>
    <Box
    sx={{
      width:"100%",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between"
    }}
    >
   <Typography variant="body2" fontWeight="700">
    お気に入り
   </Typography>
   <IconButton>
   </IconButton>
    </Box>
  </ListItemButton>
  <Box sx={{paddingTop:"10px"}}></Box>
  <ListItemButton>
    <Box
    sx={{
      width:"100%",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between"
    }}
    >
   <Typography variant="body2" fontWeight="700">
    プライベート
   </Typography>
   <IconButton>
   <AddBoxOutlinedIcon/>
   </IconButton>
    </Box>
  </ListItemButton>
</List>

    </Drawer>
  );
};

export default Sidebar;
