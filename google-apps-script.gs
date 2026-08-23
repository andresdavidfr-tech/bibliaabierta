/**
 * La Biblia Abierta — Puente entre el formulario de "Explorar" y Google Sheets
 *
 * QUÉ HACE:
 * Recibe los datos del formulario de registro (nombre, correo, teléfono,
 * ciudad, provincia, mensaje) vía POST y los agrega como una nueva fila
 * en esta hoja de cálculo. Si la hoja está vacía, crea automáticamente
 * la fila de encabezados en la primera ejecución.
 *
 * CÓMO INSTALARLO DESDE UN CELULAR (sin la app de Drive/Sheets):
 * El editor de Apps Script no existe dentro de la app móvil de Drive
 * ni de Sheets — solo en la versión de escritorio del navegador. Por
 * eso este script no depende del menú "Extensiones" de la hoja: lo
 * podés crear como proyecto independiente directo desde el navegador
 * (Chrome, Safari, etc.) de tu celular, así:
 *
 * 1. Abre tu navegador (no la app de Drive/Sheets) y anda a:
 *    https://script.google.com
 * 2. Inicia sesión con la misma cuenta (andresdavidfr@gmail.com)
 * 3. Toca "+ Nuevo proyecto" (o el botón "+")
 * 4. Borra el código de ejemplo (function myFunction() {...}) que
 *    aparece y pega TODO este archivo en su lugar
 * 5. Toca el ícono de guardar (disquete) arriba. Ponle un nombre al
 *    proyecto, ej. "Formulario Explorar"
 * 6. Toca "Implementar" (Deploy) → "Nueva implementación"
 * 7. Toca el ícono de engranaje ⚙️ junto a "Selecciona el tipo" y
 *    elige "Aplicación web"
 * 8. Configura:
 *      - Ejecutar como: Yo (tu cuenta)
 *      - Quién tiene acceso: Cualquier usuario
 * 9. Toca "Implementar". La primera vez te va a pedir autorizar
 *    permisos (aparece una advertencia de "app no verificada": tocá
 *    "Configuración avanzada" → "Ir a [nombre del proyecto] (no
 *    seguro)" → "Permitir". Es tu propio script, es seguro.)
 * 10. Copia la "URL de la aplicación web" que te da (termina en /exec)
 * 11. Pásame esa URL para que la agregue en explorar.html
 *
 * Cada vez que edites este código después de la instalación inicial,
 * tenés que hacer "Implementar" → "Gestionar implementaciones" →
 * ícono de lápiz → "Nueva versión" → "Implementar" para que los
 * cambios entren en efecto (guardar el archivo NO alcanza).
 */

// ID de la hoja "Estudio bíblico". Al usar openById en vez de
// getActiveSpreadsheet(), este script funciona igual sea un proyecto
// independiente (creado desde script.google.com) o vinculado a la
// hoja (creado desde Extensiones > Apps Script en escritorio).
var SHEET_ID = '1-eoKwWBBP8MSgD0rTPpzUaLzBNqoq9kZ_mSTpSO3yJQ';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    var headers = ['Fecha', 'Nombre', 'Correo', 'Teléfono', 'Ciudad', 'Provincia', 'Mensaje', 'Origen'];

    // Si la hoja esta vacia, escribir los encabezados primero
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.city || '',
      data.province || '',
      data.message || '',
      data.source || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Funcion de prueba opcional: podes ejecutarla desde el editor de Apps
// Script (boton "Ejecutar") para verificar que escribe correctamente
// en la hoja, sin necesidad de enviar el formulario real.
function testDoPost() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: 'Prueba de Nombre',
        email: 'prueba@ejemplo.com',
        phone: '+1 555 0000',
        city: 'Ciudad de Prueba',
        province: 'Provincia de Prueba',
        message: 'Este es un registro de prueba',
        source: 'La Biblia Abierta - Explorar (prueba)'
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
