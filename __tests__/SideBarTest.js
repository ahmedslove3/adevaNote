
import React from 'react';
import renderer from 'react-test-renderer';
import SideBar from "views/Notes/SideBar.js";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NoteSearchContainer from 'services/noteSearch.js';
import { Provider } from 'unstated';



test('Side bar main snapshot', () => {
    let note = new NoteSearchContainer();
    const component = renderer.create(
        <SideBar noteContainer={note} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


