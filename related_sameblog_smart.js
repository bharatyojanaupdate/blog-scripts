(function () {
  const domain = window.location.origin;
  const slugMatch = window.location.pathname.match(/\/(\d{4}\/\d{2}\/[^.]+)\.html/);
  const slug = slugMatch ? slugMatch[1] : '';

  function inject(posts) {
    if (!posts.length) return;
    const container = document.createElement('div');
    container.style = "margin:30px 0;padding:20px;background:#fdfdfd;border:1px solid #ccc;border-radius:8px;";
    container.innerHTML = '<h3>🔎 People Also Read</h3>';
    posts.slice(0, 3).forEach(p => {
      const item = document.createElement('div');
      item.style.margin = '8px 0';
      item.innerHTML = `<a href="${p.url}" style="color:#1565c0;text-decoration:none;">📌 ${p.title}</a>`;
      container.appendChild(item);
    });
    const footer = document.querySelector('footer') || document.body;
    footer.parentNode.insertBefore(container, footer);
  }

  function callback(data) {
    const entries = data.feed.entry || [];
    const posts = entries.map(entry => ({
      title: entry.title.$t,
      url: entry.link.find(l => l.rel === 'alternate').href.split('?')[0]
    })).filter(p => !p.url.includes(slug));

    inject(posts.sort(() => 0.5 - Math.random()));
  }

  const script = document.createElement('script');
  script.src = `${domain}/feeds/posts/summary?alt=json-in-script&callback=callback&max-results=10`;
  document.body.appendChild(script);
})();