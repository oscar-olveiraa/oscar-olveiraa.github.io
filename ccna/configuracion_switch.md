---
layout: default
title: Navegación en Cisco IOS
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
````

1)Muestra el estado y la configuración de la interfaz. Muestra también errores de entrada, colisiones, CRC...

2)Muestra la configuración de inicio actual (guardado en NVRAM).

3)Muestra la configuración actual en ejecución.

4)Muestra información sobre el sistema de archivos flash.

5)Muestra el estado del hardware y el software del sistema.

6)Muestra las últimas 1p líneas de comandos en el búfer. Se puede cambiar el tamaño con el comando **terminal history size {number}**

7)Muestra información de IP de una interfaz.

8-9)Muestra la tabla de direcciones MAC.