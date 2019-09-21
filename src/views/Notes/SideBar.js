import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clear from "@material-ui/icons/Clear";

// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import NoteSearchContainer from "services/noteSearch.js"
import { Subscribe } from 'unstated';

const useStyles = makeStyles(styles);



const SideBar = (props) => {
    const classes = useStyles();
    const [searchValue, setSearch] = useState('');

    const handleDelete = (e, note) => {
        e.stopPropagation();
        props.noteContainer.deleteNote(note.id);
    }

    return (

        <Card style={style.sideBar.card} >
            <CardBody>
                <CustomInput labelText="Search" id="search"

                    formControlProps={{
                        fullWidth: true,

                    }}
                    labelProps={{ style: style.searchLabel }}
                    inputProps={{
                        value: searchValue,
                        onChange: (e) => {
                            setSearch(e.target.value);

                            props.noteContainer.search(e.target.value);
                        },
                        style: style.searchInput,
                        type: "text",
                        endAdornment: (
                            <InputAdornment position="end">

                                <Search className={classes.searchIcon} />

                            </InputAdornment>
                        )
                    }}
                />
                {
                    props.noteContainer.state.notes.map(
                        (note, i) => {
                            return (
                                <div key={i} style={style.sideBar.notes} onClick={() => props.noteContainer.selectNote(note.id)} >
                                    <CardBody className=".note">
                                        <h4>{note.title}</h4>

                                        <Button onClick={(e) => handleDelete(e, note)} justIcon round style={style.deleteButton}>
                                            <Clear />
                                        </Button>

                                    </CardBody>
                                </div>
                            );
                        }
                    )
                }


                <Button onClick={() => props.noteContainer.addNote({ id: newId, title: "Note title", body: null, textBody: null, editing: true })} justIcon round style={style.addButton}>
                    <Add style={style.searchIcon} className={classes.searchIcon} />
                </Button>

            </CardBody>


        </Card>



    );
}


const style = {
    gridContainer: {
        height: "100%",
    },
    addButton: {
        backgroundColor: "#00acc1",
        position: "absolute",
        right: "20px",
        bottom: "20px",

    },
    deleteButton: {
        float: "right",
        minWidth: "10px",
        width: "10px",
        height: "10px",
        position: "absolute",
        top: "0",
        right: "0"
    },
    searchInput: {
        height: "50px",
    },
    searchLabel: {
        marginTop: "15px",
    },
    gridItem: {
        height: "100%",
    },
    cardFooter: {
        position: "relative",
    }
    ,
    sideBar: {
        card: {
            margin: '0',
            height: "100%",
            backgroundColor: "#212121"
        },
        notes: {
            margin: "0",
            width: "100%",
            color: "white",
            position: "relative"


        }

    },


}





export default SideBar;