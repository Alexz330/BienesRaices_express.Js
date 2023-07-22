/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function(){\n    const lat = +document.querySelector(\"#lat\").value || 14.5375583;\n    const lgn = +document.querySelector(\"#lng\").value ||  -90.5534834;\n    const map = L.map('mapa').setView([lat,lgn],16);\n    let marker;\n\n    // Utilizar Provider y Geocoder\n    const geocoderService = L.esri.Geocoding.geocodeService();\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{\n        attribution:'&copy <a href=\"https://www.openstreetmap.org/copyrigth\">OpenStreetMap</a> cotributors'\n    }).addTo(map)\n\n    marker = new L.marker([lat, lgn],{\n        draggable:true,\n        autoPan:true\n    })\n    .addTo(map)\n\n    // Detectar el moviento del pin\n\n    marker.on(\"moveend\",function(e) {\n        marker = e.target\n\n        const posicion = marker.getLatLng();\n\n        map.panTo(new L.LatLng(posicion.lat, posicion.lng));\n\n        //Obtener la informacion de las ecalles al sotra el pin\n        geocoderService.reverse().latlng(posicion,13).run(function (err, resultado){\n            \n            marker.bindPopup(resultado.address.LongLabel)\n\n            // Lenar los campose\n            document.querySelector(\".calle\").textContent =  resultado?.address?.Address ?? \"\";\n            document.querySelector(\"#calle\").value =  resultado?.address?.Address ?? \"\";\n            document.querySelector(\"#lat\").value =  resultado?.latlng?.lat ?? \"\";\n            document.querySelector(\"#lng\").value =  resultado?.latlng?.lgn ?? \"\";\n\n\n\n        })\n    })\n})()\n\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;