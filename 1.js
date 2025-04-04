function enterFullScreen() {
  // 创建一个隐藏的按钮并模拟点击
  const fullScreenButton = document.createElement("button");
  fullScreenButton.style.display = "none";
  document.body.appendChild(fullScreenButton);

  // 绑定点击事件
  fullScreenButton.addEventListener("click", () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
        .catch((err) => {
          console.error("无法进入全屏模式", err);
        });
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  });

  // 模拟点击
  fullScreenButton.click();

  // 移除按钮
  document.body.removeChild(fullScreenButton);
}

// 直接调用
enterFullScreen();


function scalePage(scaleFactor) {
  document.body.style.zoom = scaleFactor * 100 + '%';
}

// 缩小页面
scalePage(0.8); // 缩小到 80%

// 获取canvas元素
var canvas = document.querySelector('canvas[uri_prefix="libs/chem/"]');

// 修改height属性
canvas.setAttribute('height', '1318');
canvas.setAttribute('width', '2930');

// 修改style中的height
canvas.style.height = '450px';
canvas.style.width = '1000px';



// 获取div元素
var div = document.querySelector('.ScrollBar___1sQ2U');

// 修改style中的max-height
div.style.maxHeight = '344px';
