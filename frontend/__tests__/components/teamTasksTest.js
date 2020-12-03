import task from '../../src/views/TeamTasks.vue';
import { shallowMount } from '@vue/test-utils'

let teamTasksTest;
let task1 = {startDate: "2020-11-20T07:00:00.000Z"};
let task2 = {startDate: "2018-9-01T07:00:00.000Z"};
let task3 = {startDate: "2015-11-18T07:00:00.000Z"};
let task4 = {startDate: "2004-10-03T07:00:00.000Z"};
let task5 = {startDate: "2001-8-09T07:00:00.000Z"};
let task6 = {startDate: "2000-12-02T07:00:00.000Z"};
let task7 = {startDate: "2000-1-03T07:00:00.000Z"};

let taskList = [ 
    task4, task3, task2, task7, task5, task1, task6
]
let taskListOrdered = [
    task1, task2, task3, task4, task5, task6, task7
]

beforeEach(() => {
    teamTasksTest = shallowMount(task, {});
});

afterEach(() => {
    teamTasksTest.destroy();
});


test('getAllTasks returns the different appropriate categories', () => {
	//teamTasksTest.vm.getAllTasks();
	
})

test('deleted will set the task to be deleted', () => {
    let id = "123";
    expect(teamTasksTest.vm.deletePopupOpen).toEqual(false);

    teamTasksTest.vm.deleted(id);
    expect(teamTasksTest.vm.deletePopupOpen).toEqual(true);
    expect(teamTasksTest.vm.toDeleteID).toEqual(id)
})

test('The four groups are are organized by date', () => {
    teamTasksTest.vm.overdueTasks = taskList;
    expect(teamTasksTest.vm.sortedOverdueTasks).toEqual(taskListOrdered);
        // for (let i = 0; i < teamTasksTest.vm.sortedOverdueTasks.length; i++) {
        //     console.log("BEFORE: " + teamTasksTest.vm.sortedOverdueTasks[i].startDate);
            
        // }f

})