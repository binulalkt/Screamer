const scriptURL = 'https://script.google.com/macros/s/AKfycbys1NNhqXHo_0sIRy64-NE75gRSTY8lOsL62tquKM64MGag568ZW7OeYB0hxISbiSaEuw/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  console.log(new FormData(form));
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(() => { 
    const formData = new FormData(form);
    const playerNameValue = formData.get('name');
    window.location.href = 'count.html';
   
    localStorage.setItem('name', playerNameValue);
    
  })
  .catch(error => console.error('Error!', error.message))
})