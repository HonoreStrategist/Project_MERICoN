const WHATSAPP_NUMBER = '+250 788 284 487';

function buildWhatsAppUrl(type = 'general', customMessage = '') {
  const baseMessage = {
    general: 'Hello MERICoN, I would like to discuss an industrial automation or energy audit project.',
    project: 'Hello MERICoN, I need help with an industrial automation or engineering project.',
    contact: 'Hello MERICoN, I would like to inquire about your engineering services and digital products.',
  };

  const message = customMessage || baseMessage[type] || baseMessage.general;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

function attachWhatsAppActions() {
  const triggers = document.querySelectorAll('.whatsapp-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const type = trigger.dataset.type || 'general';
      const url = buildWhatsAppUrl(type);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

document.addEventListener('DOMContentLoaded', attachWhatsAppActions);
