window.ipcRenderer.on("main-process-message", (_event, ...args) => {
  console.log("[Receive Main-process message]:", ...args);
});
// window.ipcRenderer.on("main-icon-path", (_event, ...args) => {
//   console.log("[Icon path is ]", ...args);
// });
