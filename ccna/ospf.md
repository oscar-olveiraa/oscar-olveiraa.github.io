---
layout: default
title: OSPF
---

# OSPF (Open Shortest Path First) 

## Router ID

Router-ID se puede asignar de la siguiente forma ordenada:

1)Router-ID

2)Loopback

3)Interfaz router

Es ordenada ya que si se especifica Router-ID d forma manual, este será asignado, si no se espcifica Router-ID pero si interfaz de Loopback, el Router-ID pasa a ser la IP de loopback.

Para especificar de la forma 1):

![](/ccna/ospf/captura1.png)


Para especificar de la forma 2):

![](/ccna/ospf/captura3.png)

La forma 3) eligiría la IP más alta de las interfaces del router

Quedaría de esta forma es esquema de selección de Router-ID:

![](/ccna/ospf/captura2.png)

Verificación del Router-ID-> **show ip protocols**

Para refrescar el proceso de OSPF, dentro de la configuración modo privilegiado -> **clear ip ospf process**


## Redes punto a punto OSPF

🚨 IMPORTANTE: punto a punto é cando un router está conectado directamente a outro router.

Para configurar red OSPF en un router, dentro de la configuración OSPF:

````
network {ip-address} {wildcard-mask} area {area-id}
````

Ejemplo:

![](/ccna/ospf/captura4.png)


También se puede especificar en cada interfaz, se publicaría la red de esa interfaz:

````
ip ospf {process-id} area {area-id}
````

Ejemplo:

![](/ccna/ospf/captura5.png)


Configurar interfaces pasivas para que no se envién mensajes OSPF a interfaces que tienen conexión a un host:

![](/ccna/ospf/captura6.png)

En la redes punto a punto no hace falta la selección de DR y BDR, por lo que se puede desactivar con el comando dentro de la configuración de la interfaz que conecta con el otro router:

````
ip ospf network point-to-point
````

Para comprobarlo -> **show ip ospf interface {interface-id}**



## Redes de acceso múltiple OSPF

🚨 IMPORTANTE: acceso múltiple es cuando un switch interconecta otros routers. En estas redes es importante asignar DR y BDR para que no haya demasiado tráfico OSPF en la red.

Para comprobar la adyacencia (ver los vecinos) -> show ip ospf neighbor

DR y BDR se asignan según el Router-ID de cada router. Se pude especificar una prioridad, predeterminado es 1 y puede ser de 0 a 255, de esta forma el que tenga prioridad más alta es siempre DR. Dentro de la linea de configuración de interfaz:

````
ip ospf priority {n-priority}
````

## Posibles cambios OSPF área única

Las rutas OSPF se calculan según el coste de la ruta. El costo de Cisco de una interfaz es inversamente proporcional al ancho de banda de la interfaz. Por lo tanto, cuanto mayor es el ancho de banda, menor es el costo.

El ancho de banda de referencia predeterminado (100,000,000); por lo tanto, la fórmula es la siguiente:

Costo = 100.000.000 bps/ancho de banda de la interfaz en bps

Para ajustar el ancho de banda de referencia de forma global, dentro de la configuración de ospf (router ospf {process-id}) -> **auto-costreference-bandwidth {Mbps}**

🚨 IMPORTANTE: si se ajusta el ancho de banda de referencia, tiene que ser para todos los routers igual.

Para cambiar el coste de una interfaz específica, dentro de la configuración de la interfaz ->  **ip ospf cost {number}**

Para modificar los intervalos de Hello y Dead, dentro de la configuración de la interfaz:

````
Router(config-if)# ip ospf hello-interval {seconds}
Router(config-if)# ip ospf dead-interval {seconds}
````

🚨 IMPORTANTE: los intervalos deben ser iguales en ambos extremos. No es necesario editar el intervalo Dead ya que los dispositivos lo calculan automáticamente a cuatro veces el intervalo Hello.

Para verificar estos cambios -> **show ip ospf interface {interface-id}**


## Propagación de una ruta predeterminada

Dentro de la configuración de OSPF -> **default-information originate**

Para verificar -> **show ip route| begin Gateway**


## Verificación configuración OSPF

````
1)show ip ospf neighbor
2)show ip protocols
3)show ip ospf
4)show ip ospf interface {interface-id}
````

1)Para verificar que el router haya formado una adyacencia con los routers vecinos

2)Verificar información vital de configuración de OSPF, como se muestra en el ejemplo del comando. Esto incluye la ID del proceso OSPFv2, el router ID, las interfaces configuradas explícitamente para anunciar las rutas OSPF, los vecinos desde los que el router recibe actualizaciones y la distancia administrativa predeterminada, que es 110 para OSPF

3)Examinar la ID del proceso OSPFv2 y el router ID. También muestra información de área OSPFv2 y la última vez que se ejecuto el algoritmo SPF

4)Muestra el ID de proceso, el router ID local, el tipo de red, el costo OSPF, la información de DR y BDR en vínculos de acceso múltiple (no se muestra) y los vecinos adyacentes






