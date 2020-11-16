import popup from '../../src/components/Popup.vue';
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


test('emits closed event', () => {
	popupWrapper.vm.closed();
	expect(popupWrapper.emitted().closed).toEqual([[]]) //test emitted closed with parameters []
})


