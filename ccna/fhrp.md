---
layout: default
title: FHRP
---

# FHRP (First Hop Redundancy Protocol)

Función principal: crear redundancia para que un host tenga siempre conexión a otras redes aunque un router se caiga. En el caso de Cisco, tiene en propiedad el protocolo HSRP.

## HSRP

De manera predeterminada, el router con la dirección IPv4 numéricamente más alta se elige como router activo. Lo ideal es tenerlo siempre controlado y dejarlo librado al azar. Para ello se establece una prioridad (de 0 a 255 siendo por defecto 100), en la linea de configuración de interfaz:

````
standby priority {number}
````

Para forzar un nuevo proceso de elección HSRP a tener lugar cuando un routerde mayor prioridad entra en línea se activa con el siguiente comando en la linea de configuración de interfaz:

````
standby preempt
````