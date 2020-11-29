import myTasks from '../../src/views/MyTasks.vue';

import { mount } from '@vue/test-utils'

let taskWrapper;

beforeEach(() => {
	myTasks.methods.getMyTasks = jest.fn() //stub function. -> is set here since it's called in mounted. Otherwise I could have done `taskWrapper.vm.getMyTasks = jest.fn();` down below
    taskWrapper = mount(myTasks);
});

afterEach(() => {
    taskWrapper.destroy();
});


test('calls getMyTasks', () => {
	expect(myTasks.methods.getMyTasks.mock.calls.length).toEqual(1);
})


// test('savePercent', () => {
// 	myTasks.vm.savePercent	
// })

