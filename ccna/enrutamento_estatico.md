---
layout: default
title: Enrutamiento estático
---

# Enrutamiento IP estático 

🚨IMPORTANTE: activar siempre en la configuración global ipv6 routing -> **ipv6 unicast-routing**

## Ruta estática estándar

### Ruta estática de siguiente salto

Comando en la configuración global:

````
ip route {dest-address} {subnet-mask} {next-hop-address}
ipv6 route {dest-address/prefix} {next-hop-address}
````

El parámetro *next-hop-address* sería la dirección IP del siguiente salto que normalmente es la dirección IP de otro router.

### Ruta estática conectada directamente

````
ip route {dest-address} {subnet-mask} {interface-id}
ipv6 route {dest-address/prefix} {interface-id}
````

El parámetro *interface-id* sería la interfaz del router por donde saldrá el tráfico de esa ruta.

### Ruta estática totalmente especificada

````
ip route {dest-address} {subnet-mask} {interface-id} {next-hop-address}
ipv6 route {dest-address/prefix} {interface-id} {next-hop-address}
````

Esta forma de ruta estática se utiliza cuando la interfaz de salida es una interfaz de acceso múltiple y se debe identificar explícitamente el siguiente salto.

Si la ruta estática IPv6 usa una dirección IPv6 link-local como la dirección del siguiente salto, debe utilizarse una ruta estática completamente especificada

### Verificación:

````
show ip route static
show ip route network
show running-config | section ip route
````

## Ruta estática predeterminada

````
ip route 0.0.0.0 0.0.0.0 {next-hop-address | interface-id}
ipv6 route ::/0 {next-hop-address | interface-id}
````

### Verificación

````
show ip route static
````
La ruta aparece con el asterisco (*) junto a la ruta con el código "S".


## Ruta estática flotante

````
ip route {dest-address} {subnet-mask} {next-hop-address} [distance]
ipv6 route {dest-address/prefix} {next-hop-address} [distance]
````

Estas rutas sirven para tener redundancia. En el caso de que falle la ruta principal, el tráfico pasa a usar esta ruta. 

🚨 IMPORTANTE: el parámetro *distance* debe ser mayor que la de ruta principal, en las rutas estáticas la distancia de forma predeterminada es 1.


## Ruta estática a host

````
ip route {dest-address} 255.255.255.255 {next-hop-address}
ipv6 route {dest-address/128} {next-hop-address}
````

## Verificación general rutas

````
1)ping
2)traceroute
3)show ip route [static]
4)show ipv6 route [static]
5)show ip interface brief
6)show cdp neighbors
````

1)Verificar conectividad de capa 3

2)Verificar la ruta que se toma hasta el destino

3-4)Mostrar la tabla de enrutamiento. Si ponemos el parámetro *static* solamente muestra las rutas estáticas

5)Mostrar el estado de la interfaz (IP y operatividad)

6)Mostrar lista de dispositivos Cisco conectados directamente (si está activado)