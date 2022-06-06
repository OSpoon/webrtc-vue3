import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

import DeviceAccessIndex from "../views/device-access/DeviceAccessIndex.vue";
import ParameterSettingsIndex from "../views/parameter-settings/ParameterSettingsIndex.vue";

export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: {
    title: string;
    icon?: string;
  };
};

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "首页",
      icon: "icon-shouye",
    },
  },
  {
    path: "/device-access",
    name: "DeviceAccess",
    component: DeviceAccessIndex,
    meta: {
      title: "设备访问",
      icon: "icon-shebeiguanli",
    },
    children: [
      {
        path: "/device-access/Camera",
        name: "Camera",
        component: () => import("../views/device-access/children/Camera.vue"),
        meta: {
          title: "访问摄像头",
          icon: "icon-jiankongshexiangtou",
        },
      },
      {
        path: "/device-access/Microphone",
        name: "Microphone",
        component: () =>
          import("../views/device-access/children/Microphone.vue"),
        meta: {
          title: "访问麦克风",
          icon: "icon-maikefeng",
        },
      },
      {
        path: "/device-access/ScreenCapture",
        name: "ScreenCapture",
        component: () =>
          import("../views/device-access/children/ScreenCapture.vue"),
        meta: {
          title: "视频截图",
          icon: "icon-jietu",
        },
      },
      {
        path: "/device-access/SharingScreen",
        name: "SharingScreen",
        component: () =>
          import("../views/device-access/children/SharingScreen.vue"),
        meta: {
          title: "屏幕共享",
          icon: "icon-pingmugongxiang",
        },
      },
    ],
  },
  {
    path: "/parameter-settings",
    name: "ParameterSettings",
    component: ParameterSettingsIndex,
    meta: {
      title: "参数设置",
      icon: "icon-canshushezhi-05",
    },
    children: [
      {
        path: "/parameter-settings/Resolution",
        name: "Resolution",
        component: () =>
          import("../views/parameter-settings/children/Resolution.vue"),
        meta: {
          title: "设置分辨率",
          icon: "icon-icon-fenbianshuai",
        },
      },
      {
        path: "/parameter-settings/VolumeDetection",
        name: "VolumeDetection",
        component: () =>
          import("../views/parameter-settings/children/VolumeDetection.vue"),
        meta: {
          title: "音量检测",
          icon: "icon-shengyinkai",
        },
      },
      {
        path: "/parameter-settings/DeviceEnums",
        name: "DeviceEnums",
        component: () =>
          import("../views/parameter-settings/children/DeviceEnums.vue"),
        meta: {
          title: "设备枚举",
          icon: "icon-liebiao",
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
    meta: {
      title: "关于",
      icon: "icon-guanyu",
    },
  },
] as AppRouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
