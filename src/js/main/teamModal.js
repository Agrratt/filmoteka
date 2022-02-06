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
    backdropClick: document.querySelector('.mod__team'),
  };

  refs.openModalBtn.addEventListener('click', onOpenModal);

  function onOpenModal() {
    window.addEventListener('keydown', onEscClick);
    refs.modal.classList.remove('is-hidden');
  }

  refs.closeModalBtn.addEventListener('click', onCloseModal);

  function onCloseModal() {
    window.removeEventListener('keydown', onEscClick);
    refs.modal.classList.add('is-hidden');
  }

  refs.backdropClick.addEventListener('click', onBackdropClick);

  function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  }

  function onEscClick(event) {
    const ESC_KEY_CODE = 'Escape';
    console.log(event.code);

    if (event.code === ESC_KEY_CODE) {
      onCloseModal();
    }
  }
})();
