import { createApp, onBeforeMount } from "vue";
import "./style.css";
import pinia from "./store/index.js";
import { focusDirective } from "./directives/focusDirective";
import App from "./App.vue";
const app = createApp(App);
app.directive("focus", focusDirective);
app.use(pinia).mount("#app");
