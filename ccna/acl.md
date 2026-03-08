---
layout: default
title: ACL
---

# ACL (Access Control List)

🚨 IMPORTANTE: todos las ACL que creamos (sean estándar o extendida), tienen un "deny any" implícito que hace que deniege todo el tráfico si no coincide con una ACE.   

## ACL estándar

🚨 IMPORTANTE: este tipo de ACL se aplican lo más próximo al destino

◇ Sintaxis dentro de la configuración global para ACL numerada (1-99):

````
access-list {n-access-list} {deny | permit | remark {text}} source {source-wildcard} [log] 
````

El parámetro remark (opcional) se usa para poner un texto para fines de documentación. El parámetro log (opcional)gGenera y envía un mensaje informativo cuando el ACE (Access Control Entry) coincide.

◇ Sintaxis dentro de la configuración global para ACL nombrada:

````
ip access-list standard {access-list-name}
````

Dentro del modo de configuración de la ACL tenemos los siguientes comandos (usar "?" para ver los diferentes argumentos de cada comando):

![](/ccna/acl/captura1.png)

◇ Aplicar la ACL a la interfaz, dentro de la configuración de la interfaz:

````
ip access-group {n-access-list}{access-list-name} {in|out}
````

## Asegurar puertos de acceso remoto (VTY)

Dentro de la configuración de líneas remotas:

````
access-class {n-access-list | access-list-name} {in | out} 
````

Ejemplo:

![](/ccna/acl/captura2.png)


## ACL extendida

🚨 IMPORTANTE: este tipo de ACL se aplican lo más próximo al origen

◇ Sintaxis dentro de la configuración global para ACL numerada (100-199):

````
access-list {n-access-list} {permit | deny | remark} {protocol} {source-host} {source-wildcard} {dest-host} {dest-wildcard} [eq] {port-number} [established]
````

El parámetro *protocol* puede ser:

![](/ccna/acl/captura3.png)

El parámetro *established* es opcional, permite que el tráfico interno salga de la red privada interna y permite que el tráfico de respuesta devuelta entre en la red privada interna. Se deniega el tráfico TCP generado por un host externo e intentando comunicarse con un host interno.

El parámetro *port-number* va acompañado del argumento *eq* (opcional) y varía según el protocolo que pongamos en la lista de acceso, si usamos TCP:

![](/ccna/acl/captura4.png)

Si usamos UDP:

![](/ccna/acl/captura5.png)

Si usamos outro tipo de protocolos, los arguementos cambian, para verlos concretamente usar "?" para desplegar los posibles parámetros que tiene.


◇ Sintaxis dentro de la configuración global para ACL nombrada:

````
ip access-list extended {access-list-name}
````

Dentro de la configuración ACL funciona de la misma manera que la ACL estándar


◇ Aplicar la ACL a la interfaz, dentro de la configuración de la interfaz:

````
ip access-group {n-access-list}{access-list-name} {in|out}
````


## Modificar una ACL 


### Utilizar un editor de texto: 

◇ Copiar la ACL de la configuración en ejecución y pegarla en el editor de texto.

◇ Realizar las ediciones o cambios necesarios.

◇ Eliminar la ACL configurada previamente en el router (no access-list {n-access-list | access-list-name})

◇ Copiar y pegar la ACL editada de nuevo en el router.

### Utilizando los números de secuencia ACL

En la configuración de la ACL puedes eliminar una ACE:

````
no {n-sequence}
````

El parámetro *n-sequence* es el número del ACE que vamos a eliminar, ese número se puede ver con el comando **show access-list**

También se puede modificar una ACL, dentro de la configuración de la ACL:

````
{n-sequence} {deny | permit | remak} ...
````

## Verificación


````
1)show access-list
2)show ip interface {interface-id} | include access list
````

1)Revisar el ACL en la configuración. También muestra las estadísticas de cada sentencia que se ha coincidente. Para borrar las estadísticas, ejecutar comando en el modo privilegiado **clear access-list counters**

2)Verificar que el ACL está aplicado a la interfaz.