import popup from '../../src/components/TaskPopup.vue';
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
    popupWrapper = shallowMount(popup, {
        propsData: {
            popupType:1, 
            popupTask: task
        },  
    });
});

afterEach(() => {
    popupWrapper.destroy();
});


test('emits popup event', () => {
	popupWrapper.vm.taskPopupFunction();
	expect(popupWrapper.emitted().taskPopupFunction).toEqual([[task]]) //test emitted closed with parameters []
})
test('emits close event', () => {
	popupWrapper.vm.closePopup();
	expect(popupWrapper.emitted().closePopup).toEqual([[]]) //test emitted closed with parameters []
})


