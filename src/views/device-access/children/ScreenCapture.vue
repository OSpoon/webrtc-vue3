<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref } from "vue";

const video = ref<HTMLVideoElement | HTMLMediaElement>();
const canvas = ref<HTMLCanvasElement>();

const openCamera = async () => {
  try {
    const constraints: MediaStreamConstraints = { audio: false, video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoTracks = stream.getVideoTracks();
    console.log(videoTracks[0].label);
    video.value!.srcObject = stream;
  } catch (error) {
    message.error(`获取用户媒体数据错误：${error}`);
  }
};

const captureVideo = async () => {
  const videoSource = video.value as HTMLVideoElement;
  canvas.value!.width = videoSource.videoWidth;
  canvas.value!.height = videoSource.videoHeight;
  canvas.value
    ?.getContext("2d")
    ?.drawImage(videoSource, 0, 0, canvas.value!.width, canvas.value!.height);
};
</script>

<template>
  <h2>截取视频</h2>
  <a-divider />
  <a-space>
    <video ref="video" autoplay></video>
    <canvas ref="canvas"></canvas>
  </a-space>
  <a-space>
    <a-button @click="openCamera">打开摄像头</a-button>
    <a-button @click="captureVideo">截取视频</a-button>
  </a-space>
</template>

<style scoped>
video {
  border: 1px solid #ccc;
  width: 480px;
  height: 360px;
}

canvas {
  border: 1px solid #ccc;
  width: 480px;
  height: 360px;
}
</style>
