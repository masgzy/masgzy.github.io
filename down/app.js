function generateFileList() {
    const fileList = document.getElementById('fileList');
    
    files.forEach((file, index) => {
        const li = document.createElement('li');
        li.className = 'file-item';
        li.style.animationDelay = `${index * 0.05 + 0.05}s`;
        li.innerHTML = `
            <div class="file-info">
                <div class="file-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <span class="file-name">${file.name}</span>
            </div>
            <a href="${file.link}" class="download-link" download target="_blank">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载
            </a>
        `;
        fileList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', generateFileList);
