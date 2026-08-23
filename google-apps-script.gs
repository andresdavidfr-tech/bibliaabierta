/**
 * La Biblia Abierta — Puente entre el formulario de "Explorar" y Google Sheets
 *
 * QUÉ HACE:
 * Recibe los datos del formulario de registro (nombre, correo, teléfono,
 * ciudad, provincia, mensaje) vía POST y los agrega como una nueva fila
 * en esta hoja de cálculo. Si la hoja está vacía, crea automáticamente
 * la fila de encabezados en la primera ejecución.
 *
 * CÓMO INSTALARLO (una sola vez):
 * 1. Abre tu hoja: 
 *    https://docs.google.com/spreadsheets/d/1-eoKwWBBP8MSgD0rTPpzUaLzBNqoq9kZ_mSTpSO3yJQ/edit
 * 2. Menú Extensiones → Apps Script
 * 3. Borra cualquier código de ejemplo que aparezca y pega TODO este archivo
 * 4. Guarda el proyecto (ícono de disquete). Ponle un nombre, ej. "Formulario Explorar"
 * 5. Haz clic en "Implementar" (Deploy) → "Nueva implementación" (New deployment)
 * 6. En "Selecciona el tipo", elige "Aplicación web" (Web app)
 * 7. Configura:
 *      - Ejecutar como: Yo (tu cuenta)
 *      - Quién tiene acceso: Cualquier usuario (Anyone)
 * 8. Haz clic en "Implementar". Google te pedirá autorizar permisos la
 *    primera vez (aparecerá una advertencia de "app no verificada": haz
 *    clic en "Configuración avanzada" → "Ir a [nombre del proyecto]
 *    (no seguro)" → "Permitir". Es tu propio script, es seguro.)
 * 9. Copia la "URL de la aplicación web" que te da (termina en /exec)
 * 10. Pégamela o reemplázala tú mismo en explorar.html donde dice
 *     GOOGLE_SCRIPT_URL (buscá ese texto en el archivo)
 *
 * Cada vez que edites este código después de la instalación inicial,
 * tenés que hacer "Implementar" → "Gestionar implementaciones" →
 * ícono de lápiz → "Nueva versión" → "Implementar" para que los
 * cambios entren en efecto (guardar el archivo NO alcanza).
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

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
