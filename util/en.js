const lng = {
    install: {
        file: "Starting installation with configuration file: ",
        start: "Configuring as a device with ID",
        permisos: "Error al dar permisos al archivo de permisos",
        permisosSuc: "Permisos para ejecutar el archivo de servicio.",
        reload: "Recargando lista de servicios",
        reloadE: "Error al recargar lista de servicios",
        activeE: "Error al activar el servicio en el Sistema operativo",
        active: "Se ha activado el servicio en el sistema operativo",
        inie: "Error al iniciar el servicio",
        ini: "Se ha iniciado con exito el servicio",
        serviceE: "Error al escribir el archivo generado de servicio",
        service: "Se ha creado el archivo de servicio con la configuracion: ",
        serviceOS: "La creacion de un demonio solo esta activa para Linux",
        alert: "Por favor nunca elimine el archivo de configuracion ",
    },
    steps: {
        start: "Starting connection to the server",
        startEr: "Error connecting to server",
        errNoId: "Error, no existe id configurado",
        down: "Configuration download successful",
        update: "Configuration file update",
        service: "Starting background service",
    },
    file: {
        create: "File created successfully",
        error: "Error creating file: ",
        write: "Error al escribir el file: ",
        config: "Parametro no encontrado:",
        loading: "Loading",
    },
    push: {
        config: "Configuracion de push exitoso",
        channel: "Creación de canal exitosa",
        sub: "Subcribiendose al canal",
        succes: "Servicio listo",
    },
    labels: {
        index: {
            usage: "Usage: command --path optional",
            example1: "install wfg.cfg",
            example2: "Installs the push service based on the settings in the cfg file.",
            describe1: "help",
            describe2: "Show help.",
            describe3: "version",
            describe4: "Show version number.",
            epilog: "Copyright 2022",
            error: "Necesitas poner argumentos al comando",
        },
        install: {
            describe: "Install push service with config file"
        },
        service: {
            describe: "Configurar el servicio con archivo"
        }

    }
}

module.exports = lng;
