---
layout: default
title: Inter-VLAN
---

# Inter-VLAN Routing

Función principal: comunicación entre diferentes VLAN en redes distintas.

## Router-on-a-Stick

### 1º) Crear y nombrar VLAN

Tal y como se explica en la guía [VLAN](/ccna/vlan/)

### 2º) Crear la interfaz virtual (SVI) de administración

Tal y como se explica en el primer punto de la guía [configuracion de un switch](/ccna/configuracion_switch).

### 3º) Configurar puertos de acceso 

Tal y como se explica en la guía [VLAN](/ccna/vlan/)

### 4º) Configurar puertos de enlace troncal

Tal y como se explica en la guía [VLAN](/ccna/vlan/)

Esta interfaz se configura en el puerto que une el switch con el router que hace de enrutador para las VLAN.

### 5º) Configurar subinterfaces en el router

Primero creamos las subinterfaces en el modo configuración global, por ejemplo:

````
interface g0/0/0.10
````

Dentro del modo de configuración de la subinterfaz ejecutamos lo siguiente:

![](/ccna/inter_vlan/captura1.png)

La IP que se asigna a la subinterfaz es el gateway de los hosts que pertenecen a esa VLAN. 

El comando **encapsulation dot1q {vlan_id} [native]** , el *vlan_id* es el nº de VLAN que se creó en el switch y el parámetro *native* se usa para especificar la VLAN que configuramos como nativa en el Switch.

🚨 IMPORTANTE: activar la interfaz física, en este caso la interfaz **gigabitEthernet 0/0/0** con el comando **no shutdown**.


### Verificar configuración

````
show ip route
show ip interface brief
show interfaces
show interfaces trunk
````

## Usando Switches de capa 3

### 1º) Crear y nombrar VLAN

Tal y como se explica en la guía [VLAN](/ccna/vlan/)

### 2º) Crear las interfaces VLAN SVI

En el modo de configuración global ejecutamos:

![](/ccna/inter_vlan/captura2.png)

### 3º) Configurar puertos de acceso 

Tal y como se explica en la guía [VLAN](/ccna/vlan/)

### 4º) Habilitar routing IP en el switch de capa 3

Ejecutar el comando **ip routing** en la configuración global para permitir el intercambio de tráfico entre las VLAN.


Si se quiere permitir el enrutamiento a otras redes, en la interfaz que conecta el switch de capa 3 con el router se ejecuta el siguiente comando:

````
no switchport
````

De esta forma un puerto de Capa 2, se convierte en una interfaz de Capa 3. A continuación, la interfaz se puede configurar con una configuración IPv4 para conectarse a un enrutador u otro switch de capa 3.


## Comandos verificación

Tal y como se explica en la guía [VLAN](/ccna/vlan/), dentro del punto de comandos de verificación.

También importante mirar siempre de hacer pruebas de conectividad (ping,traceroute...) o mirar el archivo de ejecución (running-config).
