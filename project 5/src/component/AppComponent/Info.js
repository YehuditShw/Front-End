import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import EmojiTransportationOutlinedIcon from '@material-ui/icons/EmojiTransportationOutlined';
import PermPhoneMsgOutlinedIcon from '@material-ui/icons/PermPhoneMsgOutlined';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard() {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    <ListItemIcon>
                        <AlternateEmailOutlinedIcon color="secondary"/>
                    </ListItemIcon>
                    {user.email}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom >
                    <ListItemIcon>
                        <PermPhoneMsgOutlinedIcon color="secondary"/>
                    </ListItemIcon>
                     {user.phone}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    <ListItemIcon>
                        <EmojiTransportationOutlinedIcon color="secondary"/>
                    </ListItemIcon>
                     {user.address.city + " " + user.address.street}
                </Typography>
            </CardContent>
        </Card>
    );
}