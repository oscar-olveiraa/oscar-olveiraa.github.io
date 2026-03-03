---
layout: default
title: DHCPv4
---

# DHCPv4 (Dynamic Host Configuration Protocol para IPv4)

Función principal: asignar direcciones IPv4 y información de configuración de red dinámicamente 


## Configurar router como servidor DHCP

### 1º) Excluir direcciones IPv4 

Se debe excluir aquellas direcciones que estean configuradas manualmente en algun router, impresora, servidor, etc. Se ejecuta el siguiente comando en el modo de configuración global:

````
ip dhcp excluded-address low-address [high-address]
````

### 2º) Definir nombre grupo DHCPv4

Ejecutar el siguiente comando para entrar en el modo de configuración del grupo. Dentro de el modo de configuración global:

````
ip dhcp pool {pool-name}
````

Prompt pasa a ser-> Router(dhcp-config)#

### 3º) Configurar el grupo DHCPv4

Lista de comandos que podemos utilizar dentro de la configuración del grupo:

````
1)network {network-adress} [mask | prefix-length]
2)default-router {ip-address} [address2...address8]
3)dns-server {ip-address}[address2…address8]
4)domain-name {domain}
5)lease {days [hours[ minutes]] | infinite}
6)netbios-name-server {address} [ address2…address8]
````

1)Definir el conjunto de direcciones

2)Definir el router o gateway predeterminado

3)Definir un servidor DNS.

4)Definir el nombre de dominio.

5)Definir la duración de la concesión DHCP.

6)Definir el servidor WINS con NetBIOS.


### 4º) Verificación de la configuración

````
1)show running-config | sectiondhcp
2)show ip dhcp binding
3)show ip dhcp server statistics
````

1)Muestra los comandos DHCPv4 configurados en el router.

2)Muestra una lista de todas las vinculaciones de dirección IPv4 a dirección MAC proporcionadas por el servicio de DHCPv4.

3)Muestra información relacionada al número de mensajes DHCPv4 que han sido mandados y recibidos. 

## Desactivar servidor DHCP en un router

Para deshabilitar el servicio, usar el comando **no service dhcp global** en el modo de configuración global.

Para volver activar el servidor -> **service dhcp**

## Retransmisión tráfico DHCP a un servidor DHCP

El tráfico que usa un cliente DHCP es broadcast y los router no reenvía tráfico broadcast. Para que un cliente puede usar un servidor DHCP que está fuera de su red, la interfaz del router que tiene conexión con ese servidor DHCP se debe activar la retransmisión. Dentro del modo de configuración de la interfaz usar este comando:

````
ip helper-address {ip-address}
````

El parámetro *ip-address** es la dirección IP del servidor DHCP

Para comprobar esta configuración -> **show ip interface {interface-id}**



## Configurar router como cliente DHCPv4

Dentro de la configuración de la interfaz:

````
ip address dhcp
````
