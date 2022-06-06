<script setup lang="ts">
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";

// VGA
const vgaConstraints: MediaStreamConstraints = {
  video: {
    width: { exact: 640 },
    height: { exact: 480 },
  },
};

// 高清约束
const hdConstraints: MediaStreamConstraints = {
  video: {
    width: { exact: 1280 },
    height: { exact: 720 },
  },
};

// 超清约束
const fullHdConstraints: MediaStreamConstraints = {
  video: {
    width: { exact: 1920 },
    height: { exact: 1080 },
  },
};

const video = ref<HTMLVideoElement | HTMLMediaElement>();
const resolution = ref("hd");
const stream = ref<MediaStream>();

onMounted(() => {
  getMedia(hdConstraints);
});

const getMedia = (constraints: MediaStreamConstraints) => {
  // 销毁已存在的媒体流
  if (stream) {
    stream.value?.getTracks().forEach((track) => {
      track.stop();
    });
  }
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(inputStream)
    .catch((error) => {
      message.error(`获取用户媒体数据错误：${error.name}`);
    });
};

const inputStream = (_stream: MediaStream) => {
  stream.value = _stream;
  video.value!.srcObject = stream.value;
  const track = stream.value.getVideoTracks()[0];
  console.log(JSON.stringify(track.getConstraints()));
};

const handleChange = (value: string) => {
  switch (value) {
    case "vga":
      getMedia(vgaConstraints);
      break;
    case "hd":
      getMedia(hdConstraints);
      break;
    case "fullHd":
      getMedia(fullHdConstraints);
      break;
  }
};

const dynamicChange = () => {
  const track = stream.value?.getVideoTracks()[0];
  track
    ?.applyConstraints(fullHdConstraints as MediaTrackConstraints)
    .then(() => console.log("动态改变分辨率成功~"))
    .catch((err) => console.log("动态改变分辨率失败", err.name));
};
</script>

<template>
  <h2>设置分辨率</h2>
  <a-divider />
  <div>
    <video ref="video" autoplay></video>
  </div>
  <a-select
    v-model:value="resolution"
    style="width: 120px"
    @change="handleChange"
  >
    <a-select-option value="vga">VGA约束</a-select-option>
    <a-select-option value="hd">高清约束</a-select-option>
    <a-select-option value="fullHd">超清约束</a-select-option>
  </a-select>
  <a-button @click="dynamicChange">动态调整</a-button>
</template>

<style scoped>
video {
  border: 1px solid #ccc;
  width: 480px;
  height: 360px;
}
</style>
