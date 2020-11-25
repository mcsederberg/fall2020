import settings from '../../src/views/ProjectSettings.vue';
import { shallowMount } from '@vue/test-utils'

let popupWrapper;
var task = {
    "id":"28aebe0fdfd4",
    "userID":"12345678911",
    "projectID":"28aebe0fdfd4",
    "title":"Gantt chart",
    "summary":"Display all of the tasks in a Gantt chart",
    "dueDate":"2020-10-22 00:00:00",
    "startDate":"2020-10-15 00:00:00",
    "completedDate":null,
    "percentComplete":"28",
};
beforeEach(() => {
    settingsWrapper = shallowMount(settings, {
        propsData: {
            popupType:1, 
            popupTask: task
        },  
    });
});

afterEach(() => {
    settingsWrapper.destroy();
});


test('emits popup event', () => {
	settingsWrapper.vm.taskPopupFunction();
	expect(settingsWrapper.emitted().taskPopupFunction).toEqual([[task]]) //test emitted closed with parameters []
})

