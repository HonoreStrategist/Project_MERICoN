document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.querySelector('.form-status');

  if (!form || !status) return;

  const validateField = (field) => {
    const value = field.value.trim();
    if (field.name === 'consent') {
      return field.checked;
    }

    if (!value) {
      return false;
    }

    if (field.type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (field.type === 'tel') {
      return value.length >= 7;
    }

    if (field.name === 'name' || field.name === 'company') {
      return value.length >= 2;
    }

    if (field.name === 'message') {
      return value.length >= 10;
    }

    return true;
  };

  const setStatus = (message, type) => {
    status.textContent = message;
    status.classList.remove('success', 'error');
    if (type) status.classList.add(type);
  };

  const submitAction = (event) => {
    event.preventDefault();

    const fields = form.querySelectorAll('input, select, textarea');
    let isValid = true;

    fields.forEach((field) => {
      if (field.required) {
        const valid = validateField(field);
        if (!valid) {
          isValid = false;
          field.setAttribute('aria-invalid', 'true');
        } else {
          field.removeAttribute('aria-invalid');
        }
      }
    });

    if (!isValid) {
      setStatus('Please complete all required fields before sending your inquiry.', 'error');
      return;
    }

    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const company = formData.get('company')?.toString().trim();
    const projectType = formData.get('projectType')?.toString().trim();
    const messageText = `Hello MERICoN, my name is ${name} from ${company}. I need support with: ${projectType}.`;

    const whatsappUrl = buildWhatsAppUrl('contact', messageText);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    form.reset();
    setStatus('Your inquiry is ready to send on WhatsApp. Please review the message and continue.', 'success');
  };

  form.addEventListener('submit', submitAction);
});
