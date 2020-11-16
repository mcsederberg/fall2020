import task from '../../src/components/Task.vue';
import { shallowMount } from '@vue/test-utils'

let taskWrapper;
let testTask = {id:"123", percentComplete:"30"}

beforeEach(() => {
    taskWrapper = shallowMount(task, {
        propsData: {task:testTask, percent:"30"},  
    });
});

afterEach(() => {
    taskWrapper.destroy();
});


test('emits 3 events', () => {
	taskWrapper.vm.deleted();
	expect(taskWrapper.emitted().deleted).toEqual([[]]);
	
	taskWrapper.vm.editTask();
	expect(taskWrapper.emitted().editTask).toEqual([[testTask]])
	
	taskWrapper.vm.completeTask();
	expect(taskWrapper.emitted().completeTask).toEqual([["123"]])
})

test('emit savePercent event', () => {
	taskWrapper.vm.percentBefore = "30";
	taskWrapper.vm.percentComplete = "40";
	taskWrapper.vm.percentageChanged();
	expect(taskWrapper.emitted().savePercent).toEqual([["40"]])
})

test('prettyDate function', () => {
	let prettyDate = taskWrapper.vm.prettyDate("2020-11-28T07:00:00.000Z");
	expect(prettyDate).toEqual("Nov 28, 2020");
})


