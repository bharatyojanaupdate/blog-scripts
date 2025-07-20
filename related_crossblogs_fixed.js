(function () {
  const blogs = [
    { name: "The Blogging 6 Sense", feed: "https://theblogging6sense.blogspot.com/feeds/posts/default?alt=json&max-results=5" },
    { name: "FutureSoch", feed: "https://futuresoch.blogspot.com/feeds/posts/default?alt=json&max-results=5" },
    { name: "The Accounting Expert", feed: "https://theaccountingexpert2025.blogspot.com/feeds/posts/default?alt=json&max-results=5" }
  ];
  function inject(items) {
    const box = document.createElement("div");
    box.style = "margin:30px 0;padding:20px;background:#fffce6;border:1px solid #ddd;border-radius:8px;";
    box.innerHTML = "<h3 style='margin:0 0 10px;'>📡 From Our Other Blogs</h3>";
    items.forEach(it => {
      const div = document.createElement("div");
      div.style = "margin:10px 0;";
      div.innerHTML = `<strong>${it.blog}</strong><br><a href="${it.link}" target="_blank" style="color:#1565c0;text-decoration:none;">👉 ${it.title}</a>`;
      box.appendChild(div);
    });
    const content = document.querySelector(".post-body, .entry-content, article, .mobile-post");
    content && content.parentNode.insertBefore(box, content.nextSibling);
  }
  Promise.all(blogs.map(b =>
    fetch(b.feed).then(r => r.json()).then(j => {
      const e = j.feed.entry;
      return e ? { blog: b.name, title: e[0].title.$t, link: e[0].link.find(l => l.rel==="alternate").href.split('?')[0] } : null;
    }).catch(() => null)
  )).then(res => inject(res.filter(Boolean)));
})();
