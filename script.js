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

      container.innerHTML = data.html || '';
    } catch (error) {
      container.textContent = 'Content is currently unavailable.';
      console.error(error);
    }
  }

  loadContent();
})();
