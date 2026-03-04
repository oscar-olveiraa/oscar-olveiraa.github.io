---
layout: default
title: DHCPv6
---

# DHCPv6 (Dynamic Host Configuration Protocol para IPv6)

Hay varias formas de conseguir direccionamiento en IPv6: SLAAC, DHCPv6 sin estado y DHCPv6 con estado.

## SLAAC

El router envía paquetes RA proporcionando direcciones y otra información de configuración para que los hosts configuren automáticamente su dirección IPv6 en función de la información del RA.

Para que el router envíe esos paquetes primero tiene que escuchar en el grupo multicast ff02::2. Cuando recibe un RS de un host, contesta a ese host con un RA. Para que se una a ese grupo multicast se tiene que ejecutar el siguiente comando en el modo de configuración global:

````
ipv6 unicast-routing
````

Para comprobar que se unió al grupo multicast -> **show ipv6 interface {interface-id} | section Joined**

## Servidor DHCPv6 sin estado

El host utiliza la información del mensaje RA para direccionamiento y se pone en contacto con un servidor DHCPv6 para obtener información adicional

### 1º)Habilitar el routing IPv6

En el modo de configuración global:

````
ipv6 unicast-routing
````

### 2º)Definir el grupo DHCPv6 

En el modo de configuración global:

````
ipv6 dhcp pool {pool-name}
````

### 3º)Configurar el grupo DHCPv6

Opciones más comunes dentro de la configuración del grupo (la dirección ya se asigna dinámicamente al host al habilitar routing en un router):

````
dns-server {ipv6-address}
domain-name {name}
````

### 4º)Enlazar la interfaz al grupo

En el modo de configuración de la interfaz que une al host:

````
ipv6 nd other-config-flag
ipv6 dhcp server {pool-name}
````

## Cliente DHCPv6 sin estado

### 1º)Habilitar el routing IPv6

````
ipv6 unicast-routing
````

### 2º)Configurar el router cliente para crear una LLA

Mediante el comando de configuración de interfaz que se configura como cliente:

````
ipv6 enable
````

### 3º)Configurar el router cliente

Dentro de la configuración de interfaz que se configura como cliente, que utilice SLAAC ya que al ser sin estado no hay servidor DHCP para solicitar dirección:

````
ipv6 address autoconfig
````

### 4º)Comprobar configuración

````
1)show ipv6 interface brief
2)show ipv6 dhcp interface {interface-id}
````

1)Compruebe que el router cliente tiene asignado un GUA (Global Unicast Address).

2)Confirmar que el cliente ha recibido información de opciones DHCP, como el servidor DNS y el nombre de dominio.


## Servidor DHCPv6 con estado

### 1º)Habilitar el routing IPv6

````
ipv6 unicast-routing
````

### 2º)Definir el grupo DHCPv6 

En el modo de configuración global:

````
ipv6 dhcp pool {pool-name}
````

### 3º)Configurar el grupo DHCPv6

Opciones más comunes dentro de la configuración del grupo (la dirección ya se asigna dinámicamente al host al habilitar routing en un router):

````
dns-server {ipv6-address}
domain-name {name}
````


### 4º)Enlazar la interfaz al grupo

En el modo de configuración de la interfaz que une al host:

````
ipv6 nd managed-config-flag
ipv6 dhcp server {pool-name}
````


## Cliente DHCPv6 con estado

### 1º)Habilitar el routing IPv6

````
ipv6 unicast-routing
````

### 2º)Configurar el router cliente para crear una LLA

Mediante el comando de configuración de interfaz que se configura como cliente:

````
ipv6 enable
````

### 3º)Configurar el router cliente

Dentro de la configuración de interfaz que se configura como cliente utilizando el servidor DHCPv6:

````
ipv6 address dhcp
````

### 4º)Comprobar configuración

````
1)show ipv6 interface brief
2)show ipv6 dhcp interface {interface-id}
````

1)Compruebe que el router cliente tiene asignado un GUA (Global Unicast Address).

2)Confirmar que el cliente ha recibido información de opciones DHCP, como el servidor DNS y el nombre de dominio.


## Comandos de verificación

````
1)show ipv6 dhcp pool
2)show ipv6 dhcp binding
````

1)Verificar el nombre del pool de DHCPv6 y sus parámetros. El comando también identifica el número de clientes activos.

2)Mostrar la dirección local del vínculo IPv6 del cliente y la dirección de unidifusión global asignada por el servidor.

🚨 IMPORTANTE: La información del comando 2 la mantiene un servidor de DHCPv6 stateful,un servidor DHCPv6 sin estado no mantendría esta información.

## Configurar agente de retransmisión

Este apartado es para cuando el servidor de DHCPv6 está ubicado en una red distinta de la del cliente.

Ejecutar el siguiente comando dentro de la configuración de interfaz que conecta con el host a configurar con DHCP:

````
ipv6 dhcp relay destination {ip-address-server} {interface-id-out}
````
Los parámetros *ip-address-server* es para indicar la dirección IP del servidor y el parámetro *interface-id-out* es para indicar el puerto por donde debe salir la solicitud DHCP del host para acceder al servidor.


Comprobación del agente de retransmisión: **show ipv6 dhcp interface** y **show ipv6 dhcp binding**.
