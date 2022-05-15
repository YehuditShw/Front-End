import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Comments(props) {
    const classes = useStyles();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments/?postId=${props.postId}`)
            .then(response => response.json()
                .then((data) => {
                    setContact(data);
                }))
            .catch(() => { console.log("error") })
    }, [props])

    return (
        <div className={classes.root}>
            {contact && (contact.map(comment => {
                return (
                    <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className={classes.heading}>{comment.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CardContent>
                                <Typography >
                                    <ListItem button >
                                        <ListItemIcon>
                                            <MailOutlineOutlinedIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary={comment.email} />
                                    </ListItem>
                                </Typography>
                                <Typography >{comment.body}</Typography>
                            </CardContent>
                        </AccordionDetails>
                    </Accordion>
                )
            }))}
        </div>
    )
}