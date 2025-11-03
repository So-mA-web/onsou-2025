// News data (edit this array to manage news articles)
const newsData = [
    {
        title: '音奏オリジナル楽曲ステーション公開！',
        date: '2025.11.03',
        category: 'お知らせ',
        content: '音ゲー「音奏 -ONSOU-」のMusicStationを本日公開しました！'
    },
    {
        title: '音奏Q&A公開！',
        date: '2025.10.31',
        category: 'お知らせ',
        content: '音ゲー「音奏 -ONSOU-」のQ&Aを本日公開しました！'
    },
    {
        title: '音奏Q&A公開！',
        date: '2025.10.29',
        category: 'お知らせ',
        content: '「音奏最新バージョンva1.0.0.24」を本日より配信開始！ダウンロードはPlayの欄からダウンロードページに移動できます。'
    },
    {
        title: '公式サイトオープン！',
        date: '2025.9.23',
        category: 'お知らせ',
        content: '音ゲー「音奏 -ONSOU-」の公式サイトが本日オープンしました。最新情報はこちらでご確認ください。SNSでも情報を発信していきますので、ぜひフォローをお願いします！'
    },
];

const newsListContainer = document.getElementById('news-list');
const viewAllContainer = document.getElementById('view-all-container');
const viewAllBtn = document.getElementById('view-all-btn');
const detailContainer = document.getElementById('news-detail-container');
const newsDetailList = document.getElementById('news-detail-list');
const closeBtn = document.getElementById('close-detail-btn');
const detailTitle = document.getElementById('detail-title');
const detailMeta = document.getElementById('detail-meta');
const detailDate = document.getElementById('detail-date');
const detailCategory = document.getElementById('detail-category');
const detailContent = document.getElementById('detail-content');

// Sort news by date in descending order
const sortedNewsData = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

/**
 * ニュースリストを描画する関数
 * @param {Array} data - ニュースデータの配列
 * @param {number} limit - 表示するニュースの最大数
 */
function renderNewsList(data, limit = 3) {
    newsListContainer.innerHTML = '';
    const displayedNews = data.slice(0, limit);
    
    displayedNews.forEach((item, index) => {
        const newsItem = document.createElement('div');
        // ライトテーマに合わせてクラスを変更
        newsItem.className = 'news-item flex flex-col md:flex-row items-start p-6 rounded-lg shadow-md';
        // 元のニュースデータのインデックスではなく、ソート後のデータにおけるインデックスを使用
        // 詳細表示時には sortedNewsData[index] でデータを参照する
        const originalIndex = sortedNewsData.findIndex(n => n === item); 
        newsItem.dataset.index = originalIndex; 

        newsItem.innerHTML = `
            <div class="w-full md:w-auto md:flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <span class="bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">${item.category}</span>
            </div>
            <div>
                <span class="text-gray-500 text-sm block mb-1">${item.date}</span>
                <h3 class="text-xl font-bold mb-2 text-gray-900">${item.title}</h3>
                <p class="text-gray-700">${item.content.substring(0, 100)}...</p>
            </div>
        `;
        newsListContainer.appendChild(newsItem);
    });

    // Show "View All" button if there are more than 3 news items
    if (data.length > limit) {
        viewAllContainer.style.display = 'block';
    } else {
        viewAllContainer.style.display = 'none';
    }

    // Add click listeners to newly created elements
    document.querySelectorAll('#news-list .news-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.index;
            const itemData = sortedNewsData[index];
            
            detailTitle.textContent = itemData.title;
            detailDate.textContent = itemData.date;
            detailCategory.textContent = itemData.category;
            // カテゴリタグの色をアクセントカラーで維持
            detailCategory.className = 'bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full';
            detailContent.textContent = itemData.content;
            
            // Hide "view all" section and show single news content
            newsDetailList.style.display = 'none';
            detailTitle.style.display = 'block';
            detailMeta.style.display = 'flex';
            detailContent.style.display = 'block';

            detailContainer.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Render all news in the popup
function renderAllNewsInPopup() {
    newsDetailList.innerHTML = '';
    sortedNewsData.forEach((item) => {
        const newsItem = document.createElement('div');
        // ライトテーマに合わせてクラスを変更
        newsItem.className = 'news-item flex flex-col md:flex-row items-start p-6 rounded-lg shadow-md';
        newsItem.innerHTML = `
            <div class="w-full md:w-auto md:flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <span class="bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">${item.category}</span>
            </div>
            <div>
                <span class="text-gray-500 text-sm block mb-1">${item.date}</span>
                <h3 class="text-xl font-bold mb-2 text-gray-900">${item.title}</h3>
                <p class="text-gray-700">${item.content}</p>
            </div>
        `;
        newsDetailList.appendChild(newsItem);
    });
}

// Initial rendering of news list
renderNewsList(sortedNewsData);

// View All button functionality
viewAllBtn.addEventListener('click', () => {
    renderAllNewsInPopup();
    
    // Hide single news content section and show "view all" section
    newsDetailList.style.display = 'block';
    detailTitle.style.display = 'none';
    detailMeta.style.display = 'none';
    detailContent.style.display = 'none';

    detailContainer.classList.add('open');
    document.body.style.overflow = 'hidden';
});

// Close the detail view
closeBtn.addEventListener('click', () => {
    detailContainer.classList.remove('open');
    document.body.style.overflow = 'auto';
});

// Close on outside click
detailContainer.addEventListener('click', (e) => {
    if (e.target === detailContainer) {
        detailContainer.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu after clicking a link
        if (mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });
});

// Hamburger menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('hamburger');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
});

// Handle responsiveness
function handleResize() {
    if (window.innerWidth >= 768) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// Scroll animation for sections
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);

});
