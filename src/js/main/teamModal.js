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
    backdropClick: document.querySelector('.mod__team'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    window.addEventListener('keydown', onEscClick);
  }
  /// для backdrop
  refs.backdropClick.addEventListener('click', onBackdropClick);
  // document.querySelector('body').style.overflow = 'auto';

  function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  }
  /// для ESC
  function onEscClick(event) {
    const ESC_KEY_CODE = 'Escape';
    console.log(event.code);

    if (event.code === ESC_KEY_CODE) {
      toggleModal();
    }
  }
})();
