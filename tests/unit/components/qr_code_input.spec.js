import { shallowMount } from '@vue/test-utils'
import QRCodeInput from '@/components/QRCodeInput.vue'
import { createStore } from 'vuex'
describe('HelloWorld.vue', () => {
  describe('mounting a component', () => {
    it('renders QRCodeInput component', () => {
      const wrapper = shallowMount(QRCodeInput)
      const component = wrapper.find('.hello')
      expect(component.classes()).toContain('hello')
    })
  })

  describe('mounting a component with its dependencies', () => {
    const store = createStore({
      state () {
        return { count: 1 }
      }
    })
    const wrapper = shallowMount(QRCodeInput, {
      global: { plugin: [store] }
    })

    it('renders generate qr code button with text', () => {
      const component = wrapper.find('#btn-generate')
      expect(component.text()).toBe('Generar QR')
    })

    it('renders txt input, change value and see if stored', () => {
      const component = wrapper.find('#txt-qr-code') // se obtiene el elemento input que queremos evaluar
      expect(component.element.value).toBe('') // actualmente el valor está vacio

      component.setValue('Cesar Torrens') // Aca se setea el valor de la variable qrCodeInput a 'Cesar Torrens'
      expect(wrapper.vm.qrCodeInput).toBe('Cesar Torrens') // Una vez seteada la variable evaluamos que esa variable "qrCodeInput" tenga el valor que le asignamos en la linea anterior
    })
  })

  describe('actions and mocks', () => {
    describe('triggers click in qr code button and the event it is called', () => {
      const spySendQRCode = jest.spyOn(QRCodeInput.methods, 'sendQRCode')

      const wrapper = shallowMount(QRCodeInput)

      const txtComponent = wrapper.find('#txt-qr-code')

      txtComponent.setValue('www.wingsoft.com')

      it('the send qr code function it is beign called', async () => {
        const btnComponent = wrapper.find('#btn-generate')
        btnComponent.trigger('click')

        expect(wrapper.vm.qrCodeInput).toBe('www.wingsoft.com')
        expect(spySendQRCode).toHaveBeenCalledTimes(1) // Con esto sabemos que la funcion se ejecutó una sola vez.
        expect(wrapper.emitted()).toHaveProperty('qrCodeInput') // aca esperamos que el evento emitido tenga como nombre 'qrCodeInput'
        expect(wrapper.emitted('qrCodeInput')).toHaveLength(1) // aca esperamos que la funcion que emite el evento realmente solo haya emitido un evento
        expect(wrapper.emitted('qrCodeInput')[0]).toStrictEqual(['www.wingsoft.com']) // aca esperamos que el valor en la primera posicion de ese evento sea igual al que enviamos
      })

      it('the button is disabled by default', async () => {
        const wrapper = shallowMount(QRCodeInput)
        const txtComponent = wrapper.find('#txt-qr-code')
        const btnComponent = wrapper.find('#btn-generate')

        expect(btnComponent.attributes('disabled')).toBeDefined()
        expect(btnComponent.element.disabled).toEqual(true)
        txtComponent.setValue('www.wingsoft.com')
        await wrapper.vm.$nextTick() // nos permite esperar a que se actualice el DOM y asegurarnos que el cambio que vaya a ocurrir se refleje correctamente.
        expect(btnComponent.element.disabled).toEqual(false)
      })
    })
  })
})
