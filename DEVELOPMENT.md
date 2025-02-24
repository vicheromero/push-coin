# Guía de Desarrollo Local

## Requisitos Previos
- Node.js >= v11.9.0
- npm >= v6.5.0
- Git

## Pasos para Desarrollo Local

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/push-coin.git
cd push-coin
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Crear Archivo de Configuración
Crea un archivo `wfg.cfg` en la raíz del proyecto con el siguiente contenido:
```
ID:tu-id-de-dispositivo
URL_API:https://tu-url-api
```

### 4. Crear Link Simbólico
Este paso permite ejecutar el comando `push-coin` desde cualquier ubicación:
```bash
npm link
```

### 5. Ejecutar en Modo Desarrollo
```bash
# Para instalar el servicio
sudo push-coin install wfg.cfg

# Para configurar el servicio manualmente
push-coin configure wfg.cfg
```

### 6. Logs y Debugging
Para ver los logs del servicio:
```bash
sudo journalctl -u push-coin -f
```

## Scripts Disponibles

- `npm start`: Inicia el servicio
- `npm test`: Ejecuta las pruebas
- `npm run build`: Construye la aplicación

## Estructura del Proyecto
```
push-coin/
├── bin/           # Comandos CLI
├── services/      # Servicios de API
├── util/          # Utilidades
└── wfg.cfg       # Archivo de configuración
```

## Notas Importantes
- Asegúrate de tener los permisos necesarios para ejecutar comandos sudo
- El archivo wfg.cfg no debe ser versionado (está en .gitignore)
- Para desarrollo local, la URL_API puede ser http://localhost:puerto
