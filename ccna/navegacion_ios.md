---
layout: default
title: Navegación en Cisco IOS
---

# Navegación en Cisco IOS

La administración de routers y switches Cisco se realiza a través del sistema operativo **Cisco IOS (Internetwork Operating System)**.

Comprender su estructura jerárquica de modos es fundamental para realizar configuraciones correctamente.

---

## Modos de operación en IOS

Cisco IOS utiliza distintos niveles jerárquicos de acceso. Cada modo permite ejecutar determinados comandos.

---

### 1. User EXEC Mode (modo usuario)

Prompt -> *Router >*

◇ Es el primer modo al acceder al dispositivo.

◇ Permite ejecutar comandos básicos de verificación.

◇ No permite realizar configuraciones.

◇ Ejemplos:

 ````bash
show version
show ip interface brief
ping 192.168.1.1
````

---

### 2. Privileged EXEC Mode (modo privilegiado)

Se accede desde el modo usuario con:

````bash
enable
````

El prompt cambia a -> *Router#*


Este modo permite:

◇ Ejecutar comandos avanzados

◇ Acceder al modo de configuración

◇ Guardar configuraciones

Para volver al modo usuario:

````bash
disable
````


---

### 3. Global Configuration Mode (modo global de configuración)

Desde el modo privilegiado ejecutar el comando:

````bash
configure terminal
````


Prompt -> *Router(config)#*


Permite realizar configuraciones globales como:

````bash
hostname R1
ip routing
````


---

### 4. Interface Configuration Mode

Desde modo global:

````bash
interface {interface_name}
````


Prompt -> *Router(config-if)#*

También se puede acceder a un rango de interfaces ya que nos puede interesar para ahorrar tiempo si la configuración es igual para un grupo de interfaces:

````bash
interface range {interface_range}
````
Por ejemplo:

![](/ccna/navegacion_ios/captura3.png)

---

### 5. Line Configuration Mode

Configuración de la linea de consola o acceso remoto. Ambas sirven para acceder al dispositivo de red y administrarlo desde un ordenador. Por consola se utiliza un cable especial y tienes que estar en el lugar donde se ubica el dispositivo mientras que por acceso remoto se usa telnet o ssh:


````bash
line console 0
````

````bash
line vty 0 4
````


Prompt -> *Router(config-line)#*


Ejemplo:

````bash
password cisco
login
````


---

## Comandos de navegación y ayuda

IOS es jerárquico. Para moverse entre modos:


◇ `exit` → retrocede un nivel

◇ `end` → vuelve directamente a modo privilegiado o combinación **ctrl+Z**

◇ `disable` → vuelve al modo usuario

---

### Ayuda contextual

Usando el signo de interrogación podemos ver la lista de comandos que podemos ejecutar.


Ejemplo:

![](/ccna/navegacion_ios/captura1.png)

Si ejecutas un comando que no indentifica la IOS saltará esto:

![](/ccna/navegacion_ios/captura2.png)

Para arreglarlo, presionas las teclas **ctrl+shift+6** y dentro de la configuración global ejectuas el comando:

````bash
no ip domain-lookup
````


---

### Autocompletado

La tecla TAB completa comandos automáticamente.

Ejemplo:

conf[TAB] pasa a autocompletarse como configure

💡OJO: en el caso que haya más opciones para el comando las muestra ya que por ambigüedad no sabe que comando quieres utilizar.

---

### Abreviaciones válidas

Siempre que no haya ambigüedad puedes abreviar, por ejemplo:

````bash
conf t
int g0/0
````

---

## Guardado de configuración

🚨 IMPORTANTE: guardar siempre que se haga un cambio en el dispositivo (asignar IP a las interfaces de un router, crear una ACL...)

Para guardar cambios:

````bash
copy running-config startup-config
````


Forma abreviada:

````bash
wr
````

Esto se utiliza para cuando tengas que hacer un **reload** de un dispositivo no se pierdan los cambios ya que se guardan en la NVRAM, una memoria no volátil.

---

## Comandos show básicos para verificar la configuración

🚨 IMPORTANTE: Todos los comandos **show** se ejecutan como modo privilegiado y algunos en modo usuario, pero no todos.

````bash
show running-config
show ip interface brief
show interfaces
ping
traceroute
````

Desde el modo de configuración global tambien se puede ejecutar comandos show:

````
do show ip interface brief
````

Esto evita salir del modo configuración.

---

## Filtrado de resultados de los comandos show

◇ section: Muestra la sección completa que comienza con la expresión de filtrado.

◇ include: Incluye todas las líneas de resultados que coinciden con la expresión de filtrado.

◇ exclude: Excluye todas las líneas de resultados que coinciden con la expresión de filtrado.

◇ begin: Muestra todas las líneas de resultados desde determinado punto, comenzando por la línea que coincide con la expresión de filtrado

Ejemplos de uso:

````
show ip route | exclude static
show running-config | section interface
````



## Buenas prácticas

◇ Documentar cada interfaz con `description`

◇ Verificar antes y después de configurar

◇ Guardar la configuración tras cambios relevantes

---
