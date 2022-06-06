<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref } from "vue";

const video = ref<HTMLVideoElement | HTMLMediaElement>();

const openCamera = async () => {
  try {
    const constraints: MediaStreamConstraints = { audio: false, video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoTracks = stream.getVideoTracks();
    console.log(videoTracks);
    console.log(videoTracks[0].label);
    video.value!.srcObject = stream;
  } catch (error) {
    message.error(`获取用户媒体数据错误：${error}`);
  }
};
</script>

<template>
  <h2>访问摄像头</h2>
  <a-divider />
  <div>
    <video ref="video" autoplay></video>
  </div>
  <a-button @click="openCamera">打开摄像头</a-button>
</template>

<style scoped>
video {
  border: 1px solid #ccc;
  width: 480px;
  height: 360px;
}
</style>
