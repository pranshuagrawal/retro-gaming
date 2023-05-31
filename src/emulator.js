export async function emulatorJSLoad() {
  let VERSION = 30.5;
  if (
    (window.location &&
      ["localhost", "127.0.0.1"].includes(window.location.hostname)) ||
    ("undefined" != typeof EJS_DEBUG_XX && true === window.EJS_DEBUG_XX)
  ) {
    fetch(
      "https://raw.githack.com/EmulatorJS/EmulatorJS/main/data/version.json"
    ).then((response) => {
      if (response.ok) {
        response.text().then((body) => {
          let version = JSON.parse(body);
          if (VERSION < version.current_version) {
            console.log(
              "Using emulatorjs version " +
                VERSION +
                " but the newest version is " +
                version.current_version +
                "\nopen https://github.com/EmulatorJS/EmulatorJS to update"
            );
          }
        });
      }
    });
  }
  let scriptTag = document.getElementsByTagName("script")[0];
  function loadStyle(file) {
    return new Promise(function (resolve, reject) {
      let css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = (function () {
        if (
          "undefined" != typeof EJS_paths &&
          typeof window.EJS_paths[file] == "string"
        ) {
          return window.EJS_paths[file];
        } else if ("undefined" != typeof window.EJS_pathtodata) {
          if (!window.EJS_pathtodata.endsWith("/"))
            window.EJS_pathtodata += "/";
          return window.EJS_pathtodata + file + "?v=" + VERSION;
        } else {
          return file + "?v=" + VERSION;
        }
      })();
      css.onload = resolve;
      document.head.appendChild(css);
    });
  }
  function loadScript(file) {
    return new Promise(function (resolve, reject) {
      let script = document.createElement("script");
      script.src = (function () {
        if (
          "undefined" != typeof window.EJS_paths &&
          typeof window.EJS_paths[file] == "string"
        ) {
          return window.EJS_paths[file];
        } else if ("undefined" != typeof window.EJS_pathtodata) {
          if (!window.EJS_pathtodata.endsWith("/"))
            window.EJS_pathtodata += "/";
          return window.EJS_pathtodata + file + "?v=" + VERSION;
        } else {
          return file + "?v=" + VERSION;
        }
      })();
      scriptTag.parentNode.insertBefore(script, scriptTag);
      script.onload = resolve;
    });
  }

  await loadStyle("emu-css.css");
  await loadScript("emu-main.js");
  await loadScript("emulator.js");
  //   if (
  //     "undefined" != typeof window.EJS_DEBUG_XX &&
  //     true === window.EJS_DEBUG_XX
  //   ) {
  //     await loadStyle("emu-css.css");
  //     await loadScript("emu-main.js");
  //     await loadScript("emulator.js");
  //   } else {
  //     await loadStyle("emu-css.min.css");
  //     await loadScript("emulator.min.js");
  //   }
}
