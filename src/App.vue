<script setup lang="ts">
import { RouterView } from "vue-router";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { ref } from "vue";
import router, { routes } from "./router";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_3448908_cmyie3pet0g.js",
});

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>([]);

const handleClick: MenuProps["onClick"] = (e) => {
  router.push({ path: String(e.key) });
};
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">{{ collapsed ? "@小鑫" : "@小鑫同学" }}</div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        v-for="route in routes"
        @click="handleClick"
      >
        <a-menu-item v-if="!route.children" :key="route.path">
          <icon-font :type="`${route?.meta?.icon}`" />
          <span>{{ route?.meta?.title || route.name }}</span>
        </a-menu-item>
        <a-sub-menu v-else>
          <template #title>
            <icon-font :type="`${route?.meta?.icon}`" />
            <span>{{ route?.meta?.title || route.name }}</span>
          </template>
          <a-menu-item v-for="children in route.children" :key="children.path">
            <icon-font :type="`${children?.meta?.icon}`" />
            <span>{{ children?.meta?.title || children.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>WebRTC音视频开发</a-layout-header>
      <a-layout-content>
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style>
@import "@/assets/base.css";
.logo {
  height: 45px;
  line-height: 45px;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
.ant-layout-header {
  background: #fff;
  padding: 0;
  text-align: center;
  font-size: 20px;
}
.ant-layout-content {
  padding: 20px;
}
</style>
