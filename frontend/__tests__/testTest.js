// import taskMixin from '../src/mixins/taskMixin.js';
import popup from '../src/components/Popup.vue';
import { shallowMount } from '@vue/test-utils'

let popupWrapper;

beforeEach(() => {
    popupWrapper = shallowMount(popup, {
        propsData: {title:"a title"},  
    });
});

afterEach(() => {
    popupWrapper.destroy();
});

// test('adds', () => { //I created a simple function (sum) to test, but I deleted it since
// 	expect(taskMixin.methods.sum(1,2)).toBe(3);
// })

test('emit event', () => {
	popupWrapper.vm.closed();
	expect(popupWrapper.emitted().closed).toEqual([[]]) //test emitted closed with parameters []
})


test('is a Vue instance', () => {
	expect(popupWrapper.isVueInstance).toBeTruthy();
});