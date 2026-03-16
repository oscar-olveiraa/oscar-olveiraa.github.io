---
layout: default
title: FHRP
---

# FHRP (First Hop Redundancy Protocol)

Función principal: crear redundancia para que un host tenga siempre conexión a otras redes aunque un router se caiga. En el caso de Cisco, tiene en propiedad el protocolo HSRP.

## HSRP

Para crear el grupo HSRP y definir la IP virtual, dentro de la línea de configuración de interfaz:

````
standby {group-number} ip {virtual-ip}
````

El parámetro *group-number* es un número para identificar el grupo hsrp. El parámetro *virtual-ip* puede ser IPv4 o IPv6 y será el gateway de los hosts.

De manera predeterminada, el router con la dirección IPv4 numéricamente más alta se elige como router activo. Lo ideal es tenerlo siempre controlado y no dejarlo al azar. Para ello se establece una prioridad (de 0 a 255 siendo por defecto 100), en la linea de configuración de interfaz:

````
standby {group-number} priority {number}
````

Para forzar un nuevo proceso de elección HSRP a tener lugar cuando un router de mayor prioridad entra en línea se activa con el siguiente comando en la linea de configuración de interfaz:

````
standby {group-number} preempt
````


💡OJO: El router activo realmente responde al ARP con una MAC virtual, no con su MAC física. Eso es lo que permite que los hosts no noten el cambio cuando el router activo falla.

## Comandos de verificación

````
1)show standby 
2)show standby brief
````

1-2) Muestra el router activo, la IP virtual, prioridad y el estado de HSRP.