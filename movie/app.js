// 电影播放应用
(function() {
    const movieGrid = document.getElementById('movie-grid');
    const playerSection = document.getElementById('player-section');
    const videoPlayer = document.getElementById('video-player');
    const playerTitle = document.getElementById('player-title');
    const backBtn = document.getElementById('back-btn');
    
    // 默认海报SVG
    const defaultPosterSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
    </svg>`;
    
    // 播放图标SVG
    const playIconSvg = `<svg viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
    </svg>`;
    
    // 显示默认海报
    function showDefaultPoster(posterEl) {
        posterEl.innerHTML = defaultPosterSvg + `<div class="play-icon">${playIconSvg}</div>`;
    }
    
    // 渲染电影列表
    function renderMovies() {
        if (!movies || movies.length === 0) {
            movieGrid.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
                    </svg>
                    <p>暂无影视资源</p>
                </div>
            `;
            return;
        }
        
        movieGrid.innerHTML = '';
        
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.dataset.id = movie.id;
            card.dataset.url = movie.videoUrl || '';
            
            const poster = document.createElement('div');
            poster.className = 'movie-poster';
            
            if (movie.poster) {
                const img = document.createElement('img');
                img.src = movie.poster;
                img.alt = movie.title;
                img.loading = 'lazy';
                img.onerror = () => showDefaultPoster(poster);
                poster.appendChild(img);
                
                const playIcon = document.createElement('div');
                playIcon.className = 'play-icon';
                playIcon.innerHTML = playIconSvg;
                poster.appendChild(playIcon);
            } else {
                poster.innerHTML = defaultPosterSvg + `<div class="play-icon">${playIconSvg}</div>`;
            }
            
            const info = document.createElement('div');
            info.className = 'movie-info';
            info.innerHTML = `
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    ${movie.year ? `<span>${movie.year}</span>` : ''}
                    ${movie.duration ? `<span>${movie.duration}</span>` : ''}
                </div>
            `;
            
            card.appendChild(poster);
            card.appendChild(info);
            
            card.addEventListener('click', () => {
                playVideo(movie.title, movie.videoUrl);
            });
            
            movieGrid.appendChild(card);
        });
    }
    
    // 播放视频
    function playVideo(title, url) {
        if (!url) {
            alert('暂无播放源');
            return;
        }
        
        playerTitle.textContent = title;
        videoPlayer.src = url;
        playerSection.style.display = 'block';
        movieGrid.style.display = 'none';
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // 尝试播放
        videoPlayer.play().catch(() => {});
    }
    
    // 返回列表
    function backToList() {
        videoPlayer.pause();
        videoPlayer.src = '';
        playerSection.style.display = 'none';
        movieGrid.style.display = 'grid';
    }
    
    // 绑定返回按钮
    backBtn.addEventListener('click', backToList);
    
    // 初始化
    document.addEventListener('DOMContentLoaded', renderMovies);
})();
