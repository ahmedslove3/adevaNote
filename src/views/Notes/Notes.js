import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import SideBar from "views/Notes/SideBar.js";
import NoteEditor from "views/Notes/NoteEditor.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import NoteSearchContainer from "services/noteSearch.js"
import { Subscribe } from 'unstated';


const useStyles = makeStyles(styles);

const Notes = () => {
    const classes = useStyles();

    return (

        <Subscribe to={[NoteSearchContainer]}>
            {notesState => {
                notesState.init();
                return (

                    <GridContainer justify="flex-start" style={style.gridContainer}>
                        <GridItem xs={12} sm={12} md={4} style={style.gridItem} >

                            <SideBar noteContainer={notesState}></SideBar>

                        </GridItem>
                        <GridItem xs={12} sm={12} md={8} style={style.gridItem} >
                            <NoteEditor noteContainer={notesState}></NoteEditor>
                        </GridItem>
                    </GridContainer >
                )
            }
            }
        </Subscribe>


    );
}


const style = {
    gridContainer: {
        height: "100%",
        marginLeft: "0",
        marginRight: "0"
    },
    searchButton: {
        backgroundColor: "#00acc1",
    },
    searchInput: {
        height: "50px",
    },
    searchLabel: {
        marginTop: "15px",
    },
    gridItem: {
        height: "100%",
        paddingLeft: "0",
        paddingRight: "0"
    },
    searchIcon: {
        fill: "white"
    },



}





export default Notes;