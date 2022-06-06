<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref } from "vue";

const video = ref<HTMLVideoElement | HTMLMediaElement>();

const shareScreen = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const videoTracks = stream.getVideoTracks();
    console.log(videoTracks[0].label);
    video.value!.srcObject = stream;
  } catch (error) {
    console.log((error as Error).name);
    message.error(`获取用户媒体数据错误：${error}`);
  }
};
</script>

<template>
  <h2>共享屏幕</h2>
  <a-divider />
  <div>
    <video ref="video" autoplay></video>
  </div>
  <a-button @click="shareScreen">共享屏幕</a-button>
</template>

<style scoped>
video {
  border: 1px solid #ccc;
  width: 480px;
  height: 360px;
}
</style>
