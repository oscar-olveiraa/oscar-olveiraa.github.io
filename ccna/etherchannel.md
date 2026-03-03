---
layout: default
title: EtherChannel
---

# EtherChannel

Función principal: agrupar puertos de un switch para crear redundancia y balanceo de carga. Hay dos protocolos principales, PAgP (propiedad de Cisco) y LACP.

Cada EtherChannel tiene una interfaz de canal de puertos lógica. La configuración aplicada a la interfaz de canal de puertos afecta a todas las interfaces físicas que se asignan a esa interfaz

🚨IMPORTANTE: La configuración de los puertos individuales que forman parte del grupo EtherChannel debe ser coherente en ambos dispositivos (misma velocidad y duplex, si unos es troncal el otro tiene que ser también troncal, mismo tipo de interfaz, mismo rango de VLAN asignadas en ambas partes...). 

## Configuración EtherChannel

### 1º) Especificar rango de interfaces

En el modo configuración global:

````
interface range fastEthernet 0/1-2
````

### 2º) Crear interfaz de canal de puertos

Dentro de la configuración de rango de interfaces:

````
channel-group {number} mode {auto|active|desirable|on|passive}
````

El número identifica el canal de puertos (tiene que ser entre 1 y 6). El modo puede ser:

◇ On -> este modo obliga a la interfaz a proporcionar un canal sin PAgP o LACP. Las interfaces configuradas en el modo encendido no intercambian paquetes PAgP O LACP.

◇ Desirable -> este modo PAgP coloca una interfaz en un estado de negociación activa en el que la interfaz inicia negociaciones con otras interfaces al enviar paquetes PAgP.

◇ Auto -> este modo PAgP coloca una interfaz en un estado de negociación pasiva en el que la interfaz responde a los paquetes PAgP que recibe, pero no inicia la negociación PAgP.

◇ Active -> este modo de LACP coloca un puerto en estado de negociación activa. En este estado, el puerto inicia negociaciones con otros puertos mediante el envío de paquetes LACP.
 
◇ Passive -> este modo de LACP coloca un puerto en estado de negociación pasiva. En este estado, el puerto responde a los paquetes LACP que recibe, pero no inicia la negociación de paquetes LACP.

### 3º) Acceder a la interfaz de canal de puertos

En el modo de configuración global:

````
interface port-channel {number}
````
El número tiene que coincidir con la interfaz de canal de puertos creada. 

Una vez accedido a la interfaz la configuraríamos como si fuera una sola (hacerlo troncal, asignar VLAN...)


## Verificación EtherChannel

````
1)show interface port-channel {number}
2)show etherchannel summary
3)show etherchannel port-channel
4)show interfaces etherchannel
````

1)Muestra el estado general de la interfaz de canal de puertos

2)Muestra una línea de información por canal de puerto

3)Muestra la información sobre una interfaz de canal de puertos específica

4)Proporciona información sobre el rol de la interfaz en EtherChannel.
