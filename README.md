
<div style="width:100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
    <img style="width:200px; margin-top:25px; margin-right:-40px;" src="https://portal.ticofrut.com/Content/Images/ticofrut_logo.svg">
    <h1>Guía de Instalación Proyecto Sistema Agrícola</h1>
</div>

Esta guía describe los pasos para instalar el sistema agricola. Asegúrate de cumplir con los requisitos previos antes de comenzar la instalación.



## Requisitos Previos

1. **Sistema Operativo Compatible**:
   - Windows 7 o superior.

2. **Hardware Recomendado**:
   - **Procesador:** Intel Core i5 3.20GHz.
   - **Memoria RAM:** Mínimo 3.50 GB (12 GB recomendado).
   - **Espacio en Disco**: Al menos 20 GB libres.

3. **Software Necesario**:
   - Embarcadero RAD Studio 8.0
   - TMS Smooth Controls
   - TatukGIS
   - Developer Express.VCL

---

## Pasos de Instalación

### 1. Instalar Embarcadero RAD Studio 8.0
- Accede a la carpeta llamada ***Instalador Embarcadero***.
- Seguidamente accede a la carpeta llamada ***Install***.
- Ejecuta el archivo llamado ***install_RADStudio.exe***.
- El Embarcadero procedera a descargar e instalar los siguientes archivos necesarios:
    - Microsoft.Net Framework 3.5 Service Pack 1 (En caso de no estar instalado)
    - Microsoft JSharp Runtime 2.0 (En caso de no estar instalado)
    - AQtime 7 Standard (Se requiere datos de instalación)
        - **User Name:**  *Usuario de Windows*
        - **Company Name:** TicoFrut
    - CollabNet Subversion Client 
    - CodeSite Express
    - Rave Reports
- Utilizar los siguientes datos de registro del producto:
    - **User Name:** *Usuario de Windows*
    - **User Company:** TicoFrut
    - **Serial Numer:** JAAL-SADADA-G4Q5BE-3ECN

**NOTAS**: 

- Si el Sistema Operativo no cuenta con Microsoft.Net Framework 3.5 Service Pack 1 y Microsoft JSharp Runtime 2.0 el Embarcaero lo instalara por requisitode instalación.

- Si por alguna razon al momento de instalar genera un error al instalar ***Microsoft.Net Framework 3.5 Service     Pack 1*** porque es requerido configurarlo entonces se debe ingresar a la siguiente ruta: ```Panel de Control / Programas y Caracteristicas / Activar o Desactivar las Caracteristicas de Windows``` y verificar que elemento llamado ***.NET Framework 3.5*** se encuentre marcado.

- **IMPORTANTE** Al final de la instalacion Embarcadero va solicitar checkear automaticamente las actualizaciones cuando se ejecute, se debe desmarcar el check.

### 2. Ejecución del Instalador
- Navega al archivo descargado y haz doble clic para ejecutar el instalador.
- Si aparece un aviso de Control de Cuentas de Usuario (UAC), haz clic en **Sí** para continuar.

### 3. Selección de Idioma
- Elige el idioma de instalación y haz clic en **Aceptar**.

### 4. Aceptación del Contrato de Licencia
- Lee el contrato de licencia.
- Selecciona **Acepto los términos** y haz clic en **Siguiente**.

### 5. Selección de Edición
- Introduce tu código de licencia o selecciona la versión de prueba.
- Haz clic en **Siguiente**.

### 6. Configuración de Componentes
- Selecciona los componentes que deseas instalar:
  - Delphi
  - C++ Builder
  - Herramientas adicionales (opcional).
- Haz clic en **Siguiente**.

### 7. Configuración de Ubicación de Instalación
- Especifica el directorio donde se instalará RAD Studio (por defecto: `C:\Program Files (x86)\Embarcadero\RAD Studio`).
- Haz clic en **Siguiente**.

### 8. Instalación
- Revisa el resumen de configuración y haz clic en **Instalar**.
- Espera a que se complete el proceso de instalación. Esto puede tomar varios minutos.

### 9. Activación del Producto
- Una vez finalizada la instalación, inicia RAD Studio.
- Introduce tu clave de licencia y sigue las instrucciones para activar el producto.

### 10. Instalación de Actualizaciones (Opcional)
- Ve al menú **Tools > GetIt Package Manager**.
- Descarga e instala las actualizaciones y paquetes adicionales según sea necesario.

---

## Resolución de Problemas

### Error: "Faltan Componentes Necesarios"
- Verifica que tienes una conexión a Internet estable.
- Reinicia el instalador y asegúrate de seleccionar todos los componentes requeridos.

### Error: "Clave de Licencia Inválida"
- Asegúrate de que la clave sea correcta.
- Contacta al soporte de Embarcadero si el problema persiste.

---

## Conclusión
La instalación de Embarcadero RAD Studio es un proceso sencillo si sigues los pasos correctamente. Una vez instalado, estarás listo para desarrollar aplicaciones de alto rendimiento con Delphi y C++ Builder.

**¡Disfruta desarrollando!**
