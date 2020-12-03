import task from '../../src/views/Chart.vue';
import { shallowMount } from '@vue/test-utils'

let chartTest;
let testTaskList = [ 
    {id: "123", percentComplete: "50"}, 
    {id: "234", percentComplete: "80"}, 
    {id: "345", percentComplete: "20"} 
]

beforeEach(() => {
    chartTest = shallowMount(task, {});
});

afterEach(() => {
    chartTest.destroy();
});


test('Gantt date format', () => {
    // let date = chartTest.vm.ganttDate("2020-11-10T06:00:00.000Z");
    // expect(date).toEqual("2020-11-10");
})


