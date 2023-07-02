export const  admin = (req,res)=>{
    res.render("propiedades/admin",{
        pagina:"Mis propiedades",
        barra:true
    })
};

// Formulario para cerar una propiedad
export const crear = (req,res)=>{
    res.render("propiedades/crear",{
        pagina:"Crear Propiedad",
        barra:true
    })
}