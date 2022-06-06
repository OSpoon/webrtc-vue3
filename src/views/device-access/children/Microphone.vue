<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref } from "vue";

const audio = ref<HTMLMediaElement>();

const openMicrophone = async () => {
  try {
    const constraints: MediaStreamConstraints = { audio: true, video: false };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const audioTracks = stream.getAudioTracks();
    console.log(audioTracks[0].label);
    audio.value!.srcObject = stream;
  } catch (error) {
    message.error(`获取用户媒体数据错误：${error}`);
  }
};
</script>

<template>
  <h2>访问麦克风</h2>
  <a-divider />
  <div>
    <audio ref="audio" autoplay controls></audio>
  </div>
  <a-button @click="openMicrophone">打开麦克风</a-button>
</template>

<style scoped>
audio {
  border: 1px solid #ccc;
}
</style>
