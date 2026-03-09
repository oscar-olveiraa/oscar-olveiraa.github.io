---
layout: default
title: NAT
---

# NAT (Network Address Translation)

## NAT estático

### 1º)Crear una asignación entre la dirección local interna y las direcciones globales internas

Dentro de la configuración global:

````
ip nat inside source static {inside-local-address} {inside-global-address}
````

### 2º)Configurar interfaces

Dentro de la configuración de la interfaz:

````
ip nat {inside | outside}
````

El parámetro *inside* se usa en la interfaz que conecta a los hosts y el parámetro *outside* se usa en la interfaz por donde salga el tráfico de esa LAN.


## NAT dinámico

### 1º)Definir el conjunto de direcciones

Dentro de la configuración global:

````
ip nat pool {pool-name} {start-address} {end-address} netmask {subnet-mask}
````

### 2º)Configurar ACL para permitir la traducción

````
access-list {n-access-list} permit {ip-address} {subnet-mask}
````

### 3º)Enlazar ACL al Pool

Dentro de la configuración global:

````
ip nat inside source list {n-access-list} pool {pool-name}
````

### 4º)Configurar interfaces

Igual que en NAT estático


## PAT (Port Address Translation)

Igual que en NAT dinámico, el único paso y comando que cambia es para enlazar la ACL al Pool:

Dentro de la configuración global:

````
ip nat inside source list {n-access-list} pool {pool-name} overload
````

El parámetro overload sirve que se use PAT. Esto afecta en que a cada traducción se le asigna un puerto TCP diferente para cada sesión con un servidor de Internet y un puerto de origen para identificar de forma exclusiva la traducción NAT específica.


## Verificación

````
1)show ip nat translations
2)show ip nat statistics
````

1)Muestra las traducciones NAT activas. Para borrar entradas dinámicas antes de que se exceda el tiempo de espera, usar el comando en el modo privilegiado **clear ip nat translation**.

2)Muestra información sobre el número total de traducciones activas, los parámetros de configuración de NAT, el número de direcciones en el grupo y el número de direcciones que se han asignado.