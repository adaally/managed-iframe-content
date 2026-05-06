(function () {
  const container = document.querySelector('#managed-content');

  if (!container) return;

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

      const rawHtml = marked.parse(markdown);
      const cleanHtml = DOMPurify.sanitize(rawHtml);

      container.innerHTML = cleanHtml;
    } catch (error) {
      container.textContent = 'Content is currently unavailable.';
      console.error(error);
    }
  }

  loadContent();
})();
