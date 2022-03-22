const lng = {
    install: {
        file: "Starting installation with configuration file: ",
        start: "Configuring as a device with ID",
        permisos: "Error giving permissions",
        permisosSuc: "Permissions to run the service file.",
        reload: "Reloading list of services",
        reloadE: "Error reloading list of services",
        activeE: "Error activating the service in the operating system",
        active: "The service has been activated in the operating system",
        inie: "Failed to start service",
        ini: "The service has been started successfully",
        serviceE: "Error writing service generated file",
        service: "The service file has been created with the configuration: ",
        serviceOS: "Creating a daemon is only active for Linux",
        alert: "Please never delete the configuration file",
    },
    steps: {
        start: "Starting connection to the server",
        startEr: "Error connecting to server",
        errNoId: "Error, there is no configured id",
        down: "Configuration download successful",
        update: "Configuration file update",
        service: "Starting background service",
    },
    file: {
        create: "File created successfully",
        error: "Error creating file: ",
        write: "Error writing file: ",
        config: "Parameter not found:",
        loading: "Loading",
    },
    push: {
        config: "Successful push configuration",
        channel: "Successful channel creation",
        sub: "Subscribing to the channel",
        succes: "Service ready",
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
            error: "You need to put arguments to the command",
        },
        install: {
            describe: "Install push service with config file"
        },
        service: {
            describe: "Configure the service with file"
        }

    }
}

module.exports = lng;
