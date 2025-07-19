(function () {
  const suggestions = [
    { blog: "📘 The Blogging 6 Sense", title: "How to Rank #1 on Google in 2025", url: "https://theblogging6sense.blogspot.com/2025/06/seo-ranking-guide-2025.html" },
    { blog: "🧠 FutureSoch", title: "AI-Powered Jobs & Future of India", url: "https://futuresoch.blogspot.com/2025/06/ai-powered-jobs-india.html" },
    { blog: "💼 The Accounting Expert", title: "GST Filing Step-by-Step Guide", url: "https://theaccountingexpert2025.blogspot.com/2025/07/gst-filing-guide.html" }
  ];

  const shuffle = arr => arr.sort(() => 0.5 - Math.random());
  function inject() {
    const box = document.createElement('div');
    box.style = "margin:30px 0;padding:20px;background:#f8f9fa;border:1px dashed #888;border-radius:8px;";
    box.innerHTML = '<h3>📡 From Our Other Blogs</h3>';
    shuffle(suggestions).slice(0, 3).forEach(p => {
      const line = document.createElement('div');
      line.style.margin = '8px 0';
      line.innerHTML = `<strong>${p.blog}</strong><br><a href="${p.url}" target="_blank" style="color:#1565c0;text-decoration:none;">👉 ${p.title}</a>`;
      box.appendChild(line);
    });
    const footer = document.querySelector('footer') || document.body;
    footer.parentNode.insertBefore(box, footer);
  }
  
  document.addEventListener('DOMContentLoaded', () => setTimeout(inject, 1000));
})();