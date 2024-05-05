document.getElementById('searchButton').addEventListener('click', function(event) {
    let titleInput = document.getElementById('titleInput').value.trim();
    let errorParagraph = document.getElementById('error');

    if (titleInput === '') {
      event.preventDefault(); // si el input esta vacio, no envia el formulario y nos envia el error a la vista.
      errorParagraph.textContent = 'Debes escribir un título.';
    } else {
      errorParagraph.textContent = ''; // saca el mensaje de error si completan el titulo
    }
  });