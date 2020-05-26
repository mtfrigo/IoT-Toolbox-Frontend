# IoT Toolbox - Easing the Setup of IoT Applications

This project contains the **IoT Toolbox** Prototype, an IoT platform developed for easing the setup of IoT environments and their applications. 

The toolbox contains common building blocks that are oftentimes used in the creation of IoT environments. These building blocks can represent hardware components, network protocols, message brokers, gateways, IoT platforms, or any other software component. A building block consists of a high-level description to be understandable by domain experts as well as concrete implementations. The building blocks are provided by experts in building IoT environments and are included in a toolbox, which can be accessed by domain experts.

Furthermore, we introduce a business process based approach to set up the IoT environments based on the suggested building blocks. Hence, it makes sense to use business process management for orchestration of these steps. In this paper, we use the Business Process.

This specific project deals with the Front-end side of the project. The back-end documentation is provided as the GitHub project [IoT Toolbox BackEnd](https://github.com/mtfrigo/IoT-Toolbox-Backend).

How to install and use the Toolbox is explained in the following.

## Installation (for developers)

The following software components are used in order to set up the toolbox: [NodeJS](https://nodejs.org/en/), [Docker](https://docs.docker.com/get-docker/), ReactJS and NPM.

### 1.1 Installation on Linux 
Go to the root folder after cloning this repository and use the command: `npm install`.
After all libraries been installed you can start the react server by using the command: `npm start`.
The default server port is 3030. It can be modified changing line 20 in the file package.json.

To setup the backend go to installion section on the [IoT Toolbox BackEnd](https://github.com/mtfrigo/IoT-Toolbox-Backend) project.

### 1.2 Installation on Windows
TODO

### 1.3 Installation on Mac Os
TODO

### 1.4 Installation using Docker
TODO
