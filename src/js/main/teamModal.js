function externalLinks() {
  links = document.getElementsByTagName('a');
  for (i = 0; i < links.length; i++) {
    link = links[i];
    if (link.getAttribute('href') && link.getAttribute('rel') == 'external') link.target = '_blank';
  }
}
window.onload = externalLinks;

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();
