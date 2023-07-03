(function(){
    const lat = 14.5375583;
    const lgn = -90.5534834;
    const map = L.map('mapa').setView([lat,lgn],16);
    let marker;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution:'&copy <a href="https://www.openstreetmap.org/copyrigth">OpenStreetMap</a> cotributors'
    }).addTo(map)

    marker = new L.marker([lat, lgn],{
        draggable:true,
        autoPan:true
    })
    .addTo(map)

    // Detectar el moviento del pin

    marker.on(function(e){
        marker = e.target
        const posicion = marker.getLatLng();

        console.log(posicion);
    })
})()

