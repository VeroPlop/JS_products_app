//clases y propiedades del producto

class Product{
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// clase UI (User interface), aquí se verán sus métodos como también interación con Html

class UI{
    addProduct(producto) {
       const plist = document.getElementById('product-list');
       const element = document.createElement('div');
       element.innerHTML = `
       <div class="container mt-3">      
       <table class="table table-borderless">
         <thead>
           <tr>
             <th>Nombre del Producto</th>
             <th>Precio del producto</th>
             <th>Año del producto</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>${producto.name} </td>
             <td>${producto.price}</td>
             <td>${producto.year}</td>
             
             <td><a href="#" class="btn btn btn-danger" name="delete">Borrar</a></td>
           </tr>
          </tbody>   
       </table>
     </div>
     
       `;
       plist.appendChild(element);
       
    }
    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) { 
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.parentElement.remove();
            this.showMessage('El producto ha sido borrado con éxito', 'info',)
        }

    }
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass}`;
        div.appendChild(document.createTextNode(message));




 // Mostrando caja de mensaje segun accion (agregar, borrar, campo incompleto)

        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div,app);
        setTimeout(function(){
            document.querySelector('.alert').remove();

        }, 3000);

    }
}


//Eventos DOM (Document Object Model) captura los submit del elemento

document.getElementById('product-form')
        .addEventListener('submit',function(e){
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product (name, price, year);

    const ui = new UI();

//Validación de los inputs (mensaje que debe completar campo en caso que esté incompleto)

    if(name === '' || price === '' || year === ''){
       return ui.showMessage ('Por favor, complete todos los campos.', 'warning');
    }

    //Guardando la información exitosamente
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('¡Felicidades!, su producto ha sido agregado correctamente.', 'success')

    e.preventDefault();
});
  //Eliminando información 
document.getElementById('product-list').addEventListener('click', function(e){
        const ui = new UI();
        ui.deleteProduct(e.target);

});