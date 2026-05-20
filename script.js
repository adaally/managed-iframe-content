(function () {
  const container = document.querySelector('#managed-content');

  if (!container) return;

  function renderMarkdown(markdown) {
    const markdownWithCenteredBlocks = markdown.replace(
      /^::: center\n([\s\S]*?)\n:::/gm,
      function(_, content) {
        return '<div class="text-center">\n' + marked.parse(content.trim()) + '\n</div>';
      }
    );

    return marked.parse(markdownWithCenteredBlocks);
  }

  async function loadContent() {
    try {
      const response = await fetch('./content.json', {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Content file could not be loaded.');
      }

      const data = await response.json();
      const markdown = data.body || '';

      const rawHtml = renderMarkdown(markdown);
      const cleanHtml = DOMPurify.sanitize(rawHtml);

      container.innerHTML = cleanHtml;
    } catch (error) {
      container.textContent = 'Content is currently unavailable.';
      console.error(error);
    }
  }

  loadContent();
})();
