import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import {NavigationItems} from './NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

configure({adapter : new Adapter()});

describe("<NavigationItems/>", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    it('Should render 2 <NavigationItem/> elements if not authenticated', () => {
        //const wrapper = shallow(<NavigationItems/>);

        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Should render 4 <NavigationItem/> elements if authenticated', () => {
        //const wrapper = shallow(<NavigationItems isAuthenticated/>);

        wrapper.setProps({isAuthenticated : true});

        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });

    
    /*
    it('Should contain exact Logout NavigationItem if authenticated', () => {

        wrapper.setProps({isAuthenticated : true});

        expect(wrapper.contains(
            <NavigationItem clicked={() => this.props.onNavItemClicked("/logout")} link = "/logout">Logout</NavigationItem>
        )).toEqual(true);
    });
    */
    
});