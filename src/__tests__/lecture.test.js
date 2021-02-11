import React from "react";
import {shallow} from 'enzyme';
import AddLecturer from '../Components/Admin/AddLecturer';

describe('AddLecturer Component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<AddLecturer/>).find('form.signup').exists()).toBe(true)
    })

    it('renders a username input',()=>{
        expect(shallow(<AddLecturer/>).find('#username').length).toEqual(1);
    })

    it('renders a password input',()=>{
        expect(shallow(<AddLecturer/>).find('#password').length).toEqual(1);
    })

    it('renders a password input',()=>{
        expect(shallow(<AddLecturer/>).find('#password').length).toEqual(1);
    })
})

describe('Username input', () => {
    it('should respond to change event and change the state of the Signup Component', () => {
        const wrapper = shallow(<AddLecturer/>);
        wrapper.find('#username').simulate('change',{target:{name:'username',value:'martinking'}});

        expect(wrapper.state('username')).toEqual('martinking');
    });
})

describe('Password input', () => {
    it('should respond to change event and change the state of the Signup Component', () => {
        const wrapper = shallow(<AddLecturer/>);
        wrapper.find('#password').simulate('change',{target:{name:'password',value:'martin123'}});

        expect(wrapper.state('password')).toEqual('martin123');
    });
})