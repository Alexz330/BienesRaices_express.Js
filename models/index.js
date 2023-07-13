import Categoria from './Categoria.js';
import Precio from './Precio.js';
import Propiedad from './Propiedad.js';
import Usuario from './Usuario.js';

Propiedad.belongsTo(Precio,{foreingKey:"precioId"});
Propiedad.belongsTo(Categoria,{foreingKey:"categoriaId"});

Propiedad.belongsTo(Usuario,{foreingKey:"usuarioId"});




export{
    Categoria,
    Precio,
    Propiedad,
    Usuario
}