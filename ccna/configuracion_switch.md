---
layout: default
title: Configuración de un switch
---

# Configuración de un switch

## Configuración interfaz virtual en un switch

Para acceder a un switch de forma remota se configura una SVI (Switch Virtual Interface), dentro de la configuración global:

![](/ccna/configuracion_switch/captura6.png)

Importante destacar que el número de VLAN puede ser cualquiera y evitar que sea la 1 ya que es la predeterminada y es puede causar un fallo grande de seguridad. La dirección IP puede ser IPv6. 

Al acceder de forma remota, el switch tiene que tener una puerta de enlace predeterminada para el tráfico que genera. La puerta de enlace predeterminada normalmente es la interfaz del router que conecta a la LAN de ese switch. Para configurar una puerta de enlace en un switch, en el modo de configuración global se ejecuta el siguiente comando:

````
ip default-gateway {ip-address}
````

## Configuración de los puertos de un switch

🚨 IMPORTANTE: ambos extremos tienen que tener la misma configuración de puerto (velocidad, duplex y tipo de cable(directo o cruzado))

Dentro de la interfaz de configuración, podemos ejectuar dos comandos:

````
duplex {auto|full|half}
speed {number|auto}
````
Se puede usar el comando **mdix auto** en los switches más modernos para detectar automáticamente el tipo de conexión de cable y configurar la conexión adecuadamente. Al usar MDIX, se tiene que establecer la velocidad y el duplex a *auto*.


## Comandos de verificación en un switch

````
1)show interface [interface-id]
2)show startup-config
3)show running-config
4)show flash
5)show version
6)show history
7)show ip interface [interface-id]
8)show ipv6 interface [interface-id]
9)show mac-address-table
10)show mac address-table
11)show port
12)show arp
````

1)Muestra el estado y la configuración de la interfaz. Muestra también errores de entrada, colisiones, CRC...

2)Muestra la configuración de inicio actual (guardado en NVRAM).

3)Muestra la configuración actual en ejecución.

4)Muestra información sobre el sistema de archivos flash.

5)Muestra el estado del hardware y el software del sistema.

6)Muestra las últimas 1p líneas de comandos en el búfer. Se puede cambiar el tamaño con el comando **terminal history size {number}**

7-8)Muestra información de IP de una interfaz.

9-10)Muestra la tabla de direcciones MAC.

11)Muestra el estado de los puertos.

12)Muestra el contenido de la tabla ARP.




## Seguridad

Con estos comandos evitaremos ataques ARP, STP, DHCP...

### Desactivar CDP

Para deshabilitar CDP globalmente en un dispositivo, usar el comando **no cdp run**.

Para habilitar CDP globalmente, usar el comando **cdp run**.

Para deshabilitar CDP en un puerto, usar el comando de configuración de interfaz **no cdp enable**. 

Para habilitar CDP en un puerto, usar el comando de configuración de interfaz **cdp enable**.

### Seguridad en puertos

Para mitigar los ataques de tablas de direcciones MAC.

1º) Desactivar puertos que no se utilicen y añadirlos a una VLAN que no se use, ejemplo:

![](/ccna/configuracion_switch/captura7.png)

2º) Activar Port-Security

🚨IMPORTANTE: la interfaz tiene que estar en modo *access* o en modo *trunk* manualmente.

Se habilita con el comando **switchport port-security** dentro de la configuración de la interfaz.

3º) Configurar Port-Security

◇ Para poner máximo de direcciones MAC permitidas (min.1, max.8192) -> **switchport port-security maximum {number}**

◇ Configuración manual dirección MAC -> **switchport port-security mac-address {mac-address}**

◇ Cuando se activa el Port-Security el dispositivo conectado al puerto se asegura automáticamente pero no se agrega a la configuración en ejecución pero si se reinicia el switch se pierde. Se puede configurar el switch para aprender dinámicamente la dirección MAC y "adherirla" a la configuración en ejecución mediante el comando **switchport port-security mac-address sticky [mac-address]**

◇ Vencimiento de las direcciones estáticas y dinámicas en el puerto -> **switchport port-security aging {static | time {time} | type {absolute | inactivity}}**

Parámetro *type*:

-Absoluta: las direcciones seguras en el puerto se eliminan después del tiempo de caducidad especificado.

-Inactiva: las direcciones seguras en el puerto se eliminan si están inactivas durante un tiempo específico.


◇ Violación del puerto se activa -> **switchport port-security violation {shutdown | restrict| protect}**

Parámetro *violation*:

-shutdown(predeterminados): El puerto pasa al estado de error desactivado de inmediato, apaga el LED del puerto y envía un mensaje de registro del sistema. Aumenta el contador de violaciones. 

-restrict: El puerto descarta paquetes con direcciones de origen desconocidas hasta que elimine un número suficiente de direcciones MAC seguras para caer por debajo del valor máximo o aumentar el valor máximo. Este modo hace que el contador de Infracción de seguridad se incremente y genera un mensaje de syslog.

-protect: Este modo es el menos seguro de los modos de violaciones de seguridad. El puerto descarta paquetes con direcciones de origen MAC desconocidas hasta que elimine un número suficiente de direcciones MAC seguras para colocar por debajo del valor máximo o aumentar el valor máximo. No se envía ningún mensaje syslog

🚨IMPORTANTE: Cuando un puerto seguro se encuentra en estado de error desactivado (error-disabled), un administrador debe volver a habilitarlo ingresando los comandos **shutdown** y no **shutdown**.


Comprobación:

````
1)show port-security interface {interface-id}
2)show port-security address
3)show port-security
````

1)Mostrar todas las direcciones MAC seguras que son configuradas manualmente o aprendidas dinámicamente en todas las interfaces del switch.

2)Mostrar información para ver detalles de una interfaz específica.

3)Mostrar la configuración de seguridad del puerto del switch.

### Mitigar ataques salto VLAN

🚨 IMPORTANTE: algunos de los conceptos que se mencionan aquí aparecen en la guía [VLAN](/ccna/vlan/)

1º) Deshabilitar las negociaciones DTP (enlace automático) en los puertos que no son enlaces mediante el comando **switchport mode accesse** la interfaz del switch.

2º) Deshabilitar los puertos no utilizados y colocarlos en una VLAN no utilizada.

3º) Habilitar manualmente el enlace troncal en un puerto de enlace troncal utilizando el comando **switchport mode trunk**.

4º) Deshabilitar las negociaciones de DTP (enlace automático) en los puertos de enlace mediante el comando **switchport nonegotiate** dentro de la linea de configuración de la interfaz.

5º) Configurar la VLAN nativa en una VLAN que no sea la VLAN 1 mediante el comando **switchport trunk native vlan {vlan_number}**.


###  Mitigación ataques DHCP

1º) Habilitar DHCP snooping usando el comando **ip dhcp snooping en modo global de configuración.

2º) En los puertos de confianza (puertos donde estea el servidor DHCP o otro dispositivo de red), usar el comando **ip dhcp snooping trust**.

3º) En las interfaces que no son de confianza, limitar la cantidad de mensajes de descubrimiento de DHCP que se pueden recibir con el comando **ip dhcp snooping limit rate {n-packets-per-second}**.

4º) Habilitar la inspección DHCP por VLAN, o por un rango de VLAN, utilizando el comando **ip dhcp snooping {vlan-id}**.

Ejemplo:

![](/ccna/configuracion_switch/captura8.png)

Comprobación:

````
1)show ip dhcp snooping
2)show ip dhcp snooping binding
````

1)Verificar la configuración de inspección DHCP.

2)Ver los clientes que han recibido información de DHCP.


### Mitigación ataques de ARP

Implementación de la DAI (Dynamic ARP Inspection):

![](/ccna/configuracion_switch/captura9.png)

DAI se puede configurar para revisar si hay direcciones MAC e IP de destino o de origen. Para eso usamos el comando:

````
ip arp inspección validate {[src-mac] [dst-mac] [ip]}
````

💡OJO: al ingresar múltiples comandos de validación de inspección de arp sobre escribe el comando anterior.

🚨 IMPORTANTE: para que DAI funcione se tiene que activar DHCP snooping ya que el DAI mira la lista que genera DHCP snooping para saber la lista de dispositivos fiables.


### Mitigación ataques STP (Spanning Tree Protocol)

STP es para evitar bucles en los switches

PortFast lleva inmediatamente un puerto al estado de reenvío desde un estado de bloqueo, sin pasar por los estados de escucha y aprendizaje.

Aplicar a todos los puertos de acceso de usuario final (hosts).

PortFast se puede habilitar:

◇ En una interfaz: comando **spanning-tree portfast**.

◇ Globalmente: comando de **spanning-tree portfast default** para habilitar PortFast en todos los puertos de acceso 

Comprobación:

````
1)show running-config | begin span
2)show spanning-tree summary
3)show spanning-tree interface {interface-id} detail
````

1-2)Verificar si PortFast está habilitado globalmente.

3)Verificar si PortFast tiene habilitada una interfaz.


Al igual que PortFast, la protección BPDU sólo debe configurarse en interfaces conectadas a dispositivos finales.


BPDU Guard se puede habilitar:

◇ En una interfaz: comando **spanning-tree bpduguard enable**.

◇ Globalmente: comando de configuración **spanning-tree portfast bpduguard default**, para habilitar BPDU Guard en todos los puertos de acceso.


🚨 IMPORTANTE: Si se recibe una BPDU en un puerto de acceso habilitado para BPDU Guard, el puerto se pone en estado de error deshabilitado. Esto significa que el puerto se cierra y debe volver a habilitarse manualmente o recuperarse automáticamente a través del comando errdisable recovery cause psecure_violation
