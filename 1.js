// 全屏与缩放函数（网页4、6的全屏事件监听）
function enterFullScreen() {
  const docEl = document.documentElement;
  const requestFS = docEl.requestFullscreen || docEl.webkitRequestFullscreen;
  
  if (requestFS) {
    requestFS.call(docEl).then(() => {
      // 执行缩放（网页3的京东案例动画延迟逻辑）
      document.body.style.zoom = '80%';
      
      // 延迟1秒后执行Canvas和Div调整（网页5的异步操作优化）
      setTimeout(() => {
        // 强制重绘触发（网页3的渲染机制）
        const canvas = document.querySelector('canvas[uri_prefix="libs/chem/"]');
        const div = document.querySelector('.ScrollBar___1sQ2U');
        
        canvas.setAttribute('height', '1268');
        canvas.setAttribute('width', '2818');
        canvas.style.height = '400px';
        canvas.style.width = '888px';
        void canvas.offsetHeight; // 强制Canvas重绘

        div.style.maxHeight = '344px';
        void div.offsetHeight;    // 强制Div重绘
      }, 1000); // 关键延迟
    });
  }
}

// 初始化执行
enterFullScreen();