
import React from 'react';
import renderer from 'react-test-renderer';
import NoteEditor from "views/Notes/NoteEditor.js";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NoteSearchContainer from 'services/noteSearch.js';
import { Provider } from 'unstated';



test('Editor main snapshot', () => {
    jest.mock('draft-js/lib/generateRandomKey', () => () => '123');

    let note = new NoteSearchContainer();
    const component = renderer.create(
        <Provider>
            <NoteEditor noteContainer={note}></NoteEditor>
        </Provider>

    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

