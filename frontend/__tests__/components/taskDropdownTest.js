import task from '../../src/components/TaskDropdown.vue';
import { shallowMount } from '@vue/test-utils'

let taskDropdownTest;
let testTaskList = [ 
    {id: "123", percentComplete: "50"}, 
    {id: "234", percentComplete: "80"}, 
    {id: "345", percentComplete: "20"} 
]

beforeEach(() => {
    taskDropdownTest = shallowMount(task, {
        propsData: {taskList:testTaskList, taskGroup:"In Progress"},  
    });
});

afterEach(() => {
    taskDropdownTest.destroy();
});


test('emits 3 events', () => {
	taskDropdownTest.vm.deleted(testTaskList[0].id);
	expect(taskDropdownTest.emitted().deleted).toEqual([[testTaskList[0].id]]);
	
	taskDropdownTest.vm.editActivityPopup(testTaskList[0].id);
	expect(taskDropdownTest.emitted().editTask).toEqual([[testTaskList[0].id]]);
	
	taskDropdownTest.vm.completeTask(testTaskList[0]);
	expect(taskDropdownTest.emitted().completeTask).toEqual([[testTaskList[0]]]);
})


