import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Link } from "react-router-dom";
export default function Nav() {

    const texts = ["Info", "Todos", "Posts", "Albums"];
    const icons = [<PermIdentityIcon color="secondary" />, <AttachFileIcon color="secondary" />, <MailOutlineIcon color="secondary" />, <PermMediaIcon color="secondary" />];
    return (
        <nav className='navbar'>
            <List>
                {texts.map((text, index) => (
                    <Link to={`/application/${text.toLowerCase()}`} style={{ textDecorationLine: "none", color: "#455a64" }}>
                        <ListItem button key={text}>
                            <ListItemIcon >{icons[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </nav>
    )
}