<template>
  <div class="hello justify-center m-2">
    <input id="txt-qr-code" class="border py-2 px-3 text-grey-darkest" v-model="qrCodeInput"/>
    <button :disabled="!qrCodeInput" id="btn-generate" :class="!qrCodeInput ? 'bg-gray-600' : 'bg-indigo-600 ' " class= "m-4 p-2 rounded-md text-white text-sm" v-on:click="sendQRCode()">Generar QR</button>
  </div>
</template>

<script>
export default {
  name: 'QrCodeInput',
  data: function () {
    return {
      qrCodeInput: ''
    }
  },
  methods: {
    sendQRCode: function () {
      this.$emit('qrCodeInput', this.qrCodeInput)
    }
  }
}
</script>
