(function(){
    const lat = +document.querySelector("#lat").value || 14.5375583;
    const lgn = +document.querySelector("#lng").value ||  -90.5534834;
    const map = L.map('mapa').setView([lat,lgn],16);
    let marker;

    // Utilizar Provider y Geocoder
    const geocoderService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution:'&copy <a href="https://www.openstreetmap.org/copyrigth">OpenStreetMap</a> cotributors'
    }).addTo(map)

    marker = new L.marker([lat, lgn],{
        draggable:true,
        autoPan:true
    })
    .addTo(map)

    // Detectar el moviento del pin

    marker.on("moveend",function(e) {
        marker = e.target

        const posicion = marker.getLatLng();

        map.panTo(new L.LatLng(posicion.lat, posicion.lng));

        //Obtener la informacion de las ecalles al sotra el pin
        geocoderService.reverse().latlng(posicion,13).run(function (err, resultado){
            
            marker.bindPopup(resultado.address.LongLabel)

            // Lenar los campose
            document.querySelector(".calle").textContent =  resultado?.address?.Address ?? "";
            document.querySelector("#calle").value =  resultado?.address?.Address ?? "";
            document.querySelector("#lat").value =  resultado?.latlng?.lat ?? "";
            document.querySelector("#lng").value =  resultado?.latlng?.lng ?? "";



        })
    })
})()

