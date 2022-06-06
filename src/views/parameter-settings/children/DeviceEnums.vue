<script setup lang="ts">
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";

const video = ref<HTMLMediaElement>();

const audioInputDevices = ref<MediaDeviceInfo[]>();
const audioOutputDevices = ref<MediaDeviceInfo[]>();
const videoDevices = ref<MediaDeviceInfo[]>();

const selectedAudioInputDevice = ref<string>();
const selectedAudioOutputDevice = ref<string>();
const selectedVideoDevice = ref<string>();

const getDevices = () => {
  const audioInputDevices: MediaDeviceInfo[] = [];
  const audioOutputDevices: MediaDeviceInfo[] = [];
  const videoDevices: MediaDeviceInfo[] = [];
  return new Promise<{
    audioInputDevices: MediaDeviceInfo[];
    audioOutputDevices: MediaDeviceInfo[];
    videoDevices: MediaDeviceInfo[];
  }>((resolve) => {
    // 获取当前计算机可列举的音频输入|输出|视频输入设备
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        for (const device of devices) {
          if (device.kind === "audioinput") {
            audioInputDevices.push(device);
          } else if (device.kind === "audiooutput") {
            audioOutputDevices.push(device);
          } else if (device.kind === "videoinput") {
            videoDevices.push(device);
          }
        }
      })
      .then(() => {
        resolve({ audioInputDevices, audioOutputDevices, videoDevices });
      });
  });
};

onMounted(async () => {
  const devices = await getDevices();
  const {
    audioInputDevices: aids,
    audioOutputDevices: aods,
    videoDevices: vds,
  } = devices;

  audioInputDevices.value = aids;
  selectedAudioInputDevice.value = aids && aids[0].deviceId;

  audioOutputDevices.value = aods;
  selectedAudioOutputDevice.value = aods && aods[0].deviceId;

  videoDevices.value = vds;
  selectedVideoDevice.value = vds && vds[0].deviceId;
});

const handleChangeAudioInputDevice = (value: string) => {
  selectedAudioInputDevice.value = value;
  setTimeout(openDevice, 100);
};
const handleChangeAudioOutputDevice = (value: string) => {
  selectedAudioOutputDevice.value = value;

  video
    // @ts-ignore
    .value!.setSinkId(value)
    .then(() => {
      console.log(`音频输出设备设置成功${value}`);
    })
    .catch((error: Error) => {
      console.log(error);
    });
};
const handleChangeVideoDevice = (value: string) => {
  selectedVideoDevice.value = value;
  setTimeout(openDevice, 100);
};

const openDevice = () => {
  const constraints: MediaStreamConstraints = {
    audio: {
      deviceId: selectedAudioInputDevice.value
        ? { exact: selectedAudioInputDevice.value }
        : undefined,
    },
    video: {
      deviceId: selectedVideoDevice.value
        ? { exact: selectedVideoDevice.value }
        : undefined,
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.value!.srcObject = stream;
    })
    .catch((error) => {
      message.error(`获取用户媒体数据错误：${error.name}`);
    });
};
</script>
<template>
  <h2>设备枚举</h2>
  <a-divider />
  <a-space style="margin-bottom: 10px">
    音频输入
    <a-select
      v-model:value="selectedAudioInputDevice"
      style="width: 120px"
      @change="handleChangeAudioInputDevice"
    >
      <a-select-option
        v-for="device in audioInputDevices"
        :value="device.deviceId"
      >
        <a-tooltip>
          <template #title>{{ device.label }}</template>
          {{ device.label }}
        </a-tooltip>
      </a-select-option>
    </a-select>
    音频输出
    <a-select
      v-model:value="selectedAudioOutputDevice"
      style="width: 120px"
      @change="handleChangeAudioOutputDevice"
    >
      <a-select-option
        v-for="device in audioOutputDevices"
        :value="device.deviceId"
      >
        <a-tooltip>
          <template #title>{{ device.label }}</template>
          {{ device.label }}
        </a-tooltip>
      </a-select-option>
    </a-select>
    视频输入
    <a-select
      v-model:value="selectedVideoDevice"
      style="width: 120px"
      @change="handleChangeVideoDevice"
    >
      <a-select-option v-for="device in videoDevices" :value="device.deviceId">
        <a-tooltip>
          <template #title>{{ device.label }}</template>
          {{ device.label }}
        </a-tooltip>
      </a-select-option>
    </a-select>
  </a-space>
  <div>
    <video ref="video" autoplay></video>
  </div>
  <a-space>
    <a-button @click="openDevice">打开摄像头</a-button>
  </a-space>
</template>

<style scoped>
video {
  border: 1px solid #ccc;
  width: 480px;
  height: 360px;
}
</style>
