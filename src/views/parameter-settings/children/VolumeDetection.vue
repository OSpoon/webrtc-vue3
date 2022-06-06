<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { message } from "ant-design-vue";
import SoundMeter from "../../../utils/soundmeter";

const audioLevel = ref<number>(100);
const soundMeter = ref<SoundMeter>();

const openMicrophone = () => {
  soundMeter.value = new SoundMeter(
    new window.AudioContext(),
    (instant: number) => {
      audioLevel.value = Number(instant.toFixed(2)) * 348 + 1;
    }
  );
  const constraints: MediaStreamConstraints = { audio: true, video: false };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream: MediaStream) => {
      soundMeter.value?.connectToSource(stream);
    })
    .catch(handleError);
};

onUnmounted(() => {
  soundMeter.value?.stop();
});

const handleError = (error: Error) => {
  message.error(`获取用户媒体数据错误：${error}`);
};
</script>
  <template>
    <h2>音量检测</h2>
    <a-divider />
    <a-button @click="openMicrophone">打开麦克风</a-button>
    <div
      :style="{
        width: `${audioLevel}px`,
        height: '10px',
        background: '#8dc63f',
        marginTop: '20px',
      }"
    ></div>
  </template>
