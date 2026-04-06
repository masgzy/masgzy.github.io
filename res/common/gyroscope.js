// 陀螺仪背景效果 - 公共模块

function initGyroscope() {
  const orbs = document.querySelectorAll('.bg-orb');
  
  if (!orbs.length || !('DeviceOrientationEvent' in window)) return;
  
  // iOS 13+ 需要请求权限
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    document.body.addEventListener('click', function requestGyro() {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            enableGyroscope(orbs);
          }
        })
        .catch(console.error);
      document.body.removeEventListener('click', requestGyro);
    }, { once: true });
  } else {
    enableGyroscope(orbs);
  }
}

function enableGyroscope(orbs) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  
  window.addEventListener('deviceorientation', (e) => {
    const beta = e.beta || 0;
    const gamma = e.gamma || 0;
    
    targetX = Math.max(-50, Math.min(50, gamma * 1.5));
    targetY = Math.max(-50, Math.min(50, (beta - 45) * 1.5));
  });
  
  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    
    orbs.forEach((orb, index) => {
      const factor = 1.5 + index * 0.8;
      orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// 鼠标移动效果 (桌面端)
function initMouseEffect() {
  if ('ontouchstart' in window) return;
  
  const orbs = document.querySelectorAll('.bg-orb');
  if (!orbs.length) return;
  
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  
  document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    targetX = ((e.clientX - centerX) / centerX) * 60;
    targetY = ((e.clientY - centerY) / centerY) * 60;
  });
  
  function animate() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    
    orbs.forEach((orb, index) => {
      const factor = 1.5 + index * 0.8;
      orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// 初始化所有背景效果
function initBackgroundEffects() {
  initGyroscope();
  initMouseEffect();
}
