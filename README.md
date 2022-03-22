# Push Coin
Instalación de programa CLI para conectar con servicio socket para actualizar un archivo de configuración *Raspberry Pi* y ejecutar comandos SHELL por servicios REST átravez de un evento socket. probado en Ubuntu y en Debian creado para *Raspbian*

## Requerimientos
- `nodeJS >= v11.9.0`
- `npm >= v6.5.0`
- `REST full admnistrator`
- `OS == Linux`

## Instalación
### Instalación de nodejs versión especifica
````shell
wget https://nodejs.org/dist/v11.9.0/node-v11.9.0-linux-armv6l.tar.gz
````

````shell
tar -xzf node-v11.9.0-linux-armv6l.tar.gz
````

````shell
node-v11.9.0-linux-armv6l/bin/node -v
````

Si te devuelve esto todo está perfecto:
`` 11.9.0``

````shell
cd node-v11.9.0-linux-armv6l
````

````shell
sudo cp -R * /usr/local/
````
### Instalación de programa

````shell
npm install -g https://github.com/serobalino/push-coin
````

## Ejecución
### Instalación
Recuerda ejecutar el instalador con permisos de administrador y el archivo de configuración
````shell
sudo push-coin configuration.cfg 
````

