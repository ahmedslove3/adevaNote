
import React from 'react';
import renderer from 'react-test-renderer';
import SideBar from "views/Notes/SideBar.js";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NoteSearchContainer from 'services/noteSearch.js';
import { Provider } from 'unstated';


const container = new NoteSearchContainer();



test("inial NoteContainer state", async () => {

    await container.init({
        id: 0,
        body: null,
        editing: true,
        textBody: "This is a note one",
        title: "note 1"
    });

    console.log(container);
    // find 1 notes by defaults
    expect(container.state.notes).toMatchObject([
        {
            id: 0,
            body: null,
            editing: true,
            textBody: "This is a note one",
            title: "note 1"
        }]
    );

});

test("adding anothr note", async () => {

    // add another note

    await container.addNote({
        body: null,
        editing: true,
        textBody: "This is a note two",
        title: "note 2"
    })


    // find 2 notes 
    expect(container.state.notes).toMatchObject([
        {
            id: 0,
            body: null,
            editing: false,
            textBody: "This is a note one",
            title: "note 1"
        },
        {
            id: 1,
            body: null,
            editing: true,
            textBody: "This is a note two",
            title: "note 2"
        },
    ]
    );

});

test("selecting the first note again", async () => {

    await container.selectNote(0);

    // the current selected note
    expect(container.selectedNote).toMatchObject(
        {
            id: 0,
            body: null,
            editing: true,
            textBody: "This is a note one",
            title: "note 1"
        }
    );

    // state shape
    expect(container.state.notes).toMatchObject([
        {
            id: 0,
            body: null,
            editing: true,
            textBody: "This is a note one",
            title: "note 1"
        },
        {
            id: 1,
            body: null,
            editing: false,
            textBody: "This is a note two",
            title: "note 2"
        },
    ]
    );

});

test("editing the selected note", async () => {

    await container.editNote("normal body edited", "Text body edited");
    await container.editTitle("a new title");
    // new state shap
    expect(container.state.notes).toMatchObject([
        {
            id: 0,
            body: "normal body edited",
            editing: true,
            textBody: "Text body edited",
            title: "a new title"
        },
        {
            id: 1,
            body: null,
            editing: false,
            textBody: "This is a note two",
            title: "note 2"
        },
    ]
    );
});

test("searching for a note", async () => {

    // add other notes for search testing

    await container.addNote({
        body: null,

        textBody: "This is a note specific string",
        title: "note 2"
    });

    await container.addNote({
        body: null,

        textBody: "This is a note",
        title: "specific title"
    });

    await container.search("specific string")  // search for the above one
    expect(container.state.notes).toMatchObject([
        {
            id: 2,
            body: null,
            editing: false,
            textBody: "This is a note specific string",
            title: "note 2"
        }]
    );

    await container.search("specific title")  // search for the lower one
    expect(container.state.notes).toMatchObject([
        {
            id: 3,
            body: null,
            editing: true,
            textBody: "This is a note",
            title: "specific title"
        }]
    );

    await container.search("")  // nothing returns all the notes
    expect(container.state.notes).toMatchObject([
        {
            id: 0,
            body: "normal body edited",
            editing: false,
            textBody: "Text body edited",
            title: "a new title"
        },
        {
            id: 1,
            body: null,
            editing: false,
            textBody: "This is a note two",
            title: "note 2"
        },
        {
            id: 2,
            body: null,
            editing: false,
            textBody: "This is a note specific string",
            title: "note 2"
        },
        {
            id: 3,
            body: null,
            editing: true,
            textBody: "This is a note",
            title: "specific title"
        }

    ]
    );

});

test("deleteing a note", async () => {


    await container.deleteNote(2);//delete the third one

    expect(container.state.notes).toMatchObject([
        {
            id: 0,
            body: "normal body edited",
            editing: true,
            textBody: "Text body edited",
            title: "a new title"
        },
        {
            id: 1,
            body: null,
            editing: false,
            textBody: "This is a note two",
            title: "note 2"
        },

        {
            id: 3,
            body: null,
            editing: false,
            textBody: "This is a note",
            title: "specific title"
        }]
    );

});

