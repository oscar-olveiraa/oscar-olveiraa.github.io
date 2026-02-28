---
layout: default
title: VLAN
---

# VLAN (Virtual Local Area Network)

Esta configuración se hace en un dispositivo switch.


## Configuración VLAN

La lista de VLAN se guarda en el archivo vlan.dat en la flash.

Comandos para la creación de una VLAN:

![](/ccna/vlan/captura1.png)

Una vez creado la VLAN, se asigna a una interfaz:

![](/ccna/vlan/captura2.png)

Añadir una vlan que sea para el tráfico de voz hará que use QoS, para hacerlo simplemente se crea una VLAN (en el e.j es 150) y se la asigna a una interfaz con los siguientes comandos dentro del modo de configuración de interfaz:

````
mls qos trust cos
switchport voice vlan 150
````

Eliminar una VLAN con el comando **no vlan {vlan-id}**. 

🚨 IMPORTANTE: antes de eliminar una VLAN, reasignar los puertos asignados a esa VLAN a una existente.

Eliminar todas las VLAN con el comando **delete flash:vlan.dat**. Posteriormente hacer un **reload** en el switch


## Configuración puerto troncal VLAN

Comandos para crear puerto troncal VLAN:

![](/ccna/vlan/captura3.png)

Para restablecer el puerto al estado predeterminado:

````
no switchport trunk allowed vlan
no switchport trunk native vlan
````


## DTP (Dynamic Trunking Protocol)

Al configurar una interfaz como troncal, los dispositivos de Cisco pueden negociar para automatizar la configuración trunking. En el modo interfaz de configuración, para desactivarlo:

````
switchport nonegotiate
````

Para activarlo hay varios modos:

````
1)switchport mode dynamic auto
2)switchport mode dynamic desirable
````

1)Se convierte en una interfaz troncal si la interfaz vecina se configura en modo troncal o "desirable".

2)Busca activamente convertirse en un "trunk" negociando con otras interfaces automáticas o "desirable".




## Comandos de verificación

````
1)show vlan brief
2)show vlan {idvlan-id}
3)show vlan {namevlan-name}
4)show interfaces [interface-id] switchport
5)show dtp interface [interface-id]
````

1)Muestra el nombre, el estado y sus puertos de la VLAN, una VLAN por línea.

2-3)Muestra información sobre el número de ID de VLAN identificado.

4)Muestra las VLAN de datos y voz asignadas a la interfaz. También características del puerto si es troncal.

5)Para determinar el modo DTP actual. Se recomienda que las interfaces estean o modo "access" o modo "trunk" y desactivar DTP.