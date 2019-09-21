
import { Container } from 'unstated';
import _ from 'Lodash';
import StorageProvider from 'services/storageProvider'


class NoteSearchContainer extends Container {

    // add multiple empty notes
    // close and open with empty notes
    NOTES_KEY = "notes";

    selectedNote = "";// represent the current selected note
    savedNotes = [];

    initFlage = false;

    editorInialState = null;

    constructor() {
        super();
        console.log("constructor");

        this.savedNotes = StorageProvider.read(this.NOTES_KEY);



        this.state = {
            notes: this.savedNotes || []
        };


    }

    init(note) {
        if (this.initFlage) return;

        this.initFlage = true;

        if (!this.savedNotes.length) {
            return this.addNote(note);
        } else {
            return this.selectNote(0);
        }
    }

    search(value) {
        console.log("search");
        if (!value) {
            this.setState({ notes: this.savedNotes });
            return;
        }

        const result = _.filter(this.savedNotes, (o) => {

            return (-1 < o.title.search(value) || -1 < o.textBody.search(value));
        });

        return this.setState({ notes: result });
    }

    addNote(note) {
        console.log("addNote");
        // if there was a note being edited save it an switch to the new one 

        let currentNotes = this.state.notes;

        let newId = 0;
        // if we our array is not empty overide the new id value
        if (currentNotes.length > 0) {
            newId = currentNotes[currentNotes.length - 1].id + 1;
        }
        note.id = newId;

        let newNotes = [...currentNotes, note];

        // select the new note after making it
        return this.setState({ notes: newNotes },
            () => {
                this.selectNote(newId);
                this.presistNotes();
            }

        );
    }

    selectNote(id) {
        console.log("selectNote", id);
        const notes = _.map(this.state.notes, (o) => {
            if (o.id === id) {
                o.editing = true;
                this.selectedNote = o;
            } else {
                o.editing = false;
            }
            return o;

        });


        return this.setState({ notes: notes })
    }

    deleteNote(id) {
        console.log("deleteNote");
        const notes = _.filter(this.state.notes, (o) => {
            return o.id !== id

        });
        console.log("befor setState", notes);
        // select the new note after making it
        return this.setState({ notes: notes },
            () => {
                console.log("current state", this.state);
                this.selectNote(notes[0].id);
                this.presistNotes();
            }

        );


    }

    editNote(state, textState) {
        console.log("editNote");
        const notes = _.map(this.state.notes, (o) => {
            if (o.editing) {
                o.body = state;
                o.textBody = textState
            }
            return o;

        });

        return this.setState({ notes: notes },
            () => {
                this.presistNotes();
            });


    }


    editTitle(title) {
        console.log("editTitel");
        const notes = _.map(this.state.notes, (o) => {

            if (o.editing) {
                o.title = title;
            }
            return o;

        });

        return this.setState({ notes: notes },
            () => {
                this.presistNotes();
            })
    }


    presistNotes() {
        console.log("presist");
        this.savedNotes = [...this.state.notes];
        console.log(this.state.notes);

        StorageProvider.save(this.NOTES_KEY, this.savedNotes);

    }



}



export default NoteSearchContainer;