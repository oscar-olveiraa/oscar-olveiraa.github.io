---
layout: default
title: Navegación en Cisco IOS
---

# Configuración de un router

## Configurar interfaces en router

Para configurar una interfaz en un router se va a ejecutar los siguientes comandos dentro dentro del modo de configuración de interfaces:

````
description {Descripción de la interfaz}
ip address {ip-address} {subnet-mask}
ipv6 address {ipv6-address/prefix-length}
ipv6 address {ipv6-link-local-address} link-local
no shutdown
````

## Comandos de verificación

````
1)show ip interface brief
2)show ipv6 interface brief
3)show ip route
4)show ipv6 route
5)show interfaces [interface-id]
6)show ip interface [interface-id]
7)show ipv6 interface [interface-id]
8)show running-config
9)show startup-config
10)show version
11)show history
````

1-2)El resultado muestra todas las interfaces, sus direcciones IPv4/IPv6 y el estado actual de forma abreviada.

3-4)Muestra la tabla de enrutamiento almacenada en RAM.

5)Este comando muestra estadísticas de todas las interfaces del dispositivo. Sólo muestra la información de direcciones IPv4.

6-7)Muestra las estadísticas de IPv4/IPv6 correspondientes a todas las interfaces de un router.

8)Muestra el archivo **running-config**. Este archivo muestra la configuración del router que está guardado en memoria RAM. 

9)Muestra la configuración de inicio actual (guardado en NVRAM).

10)Muestra el estado del hardware y el software del sistema.

11)Muestra las últimas 1p líneas de comandos en el búfer. Se puede cambiar el tamaño con el comando **terminal history size {number}**