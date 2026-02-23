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

* Es el primer modo al acceder al dispositivo.
* Permite ejecutar comandos básicos de verificación.
* No permite realizar configuraciones.
* Ejemplos:

    ````
    show version
    show ip interface brief
    ping 192.168.1.1
    ````

---

### 2. Privileged EXEC Mode (modo privilegiado)

Se accede desde el modo usuario con:

````
enable
````

El prompt cambia a -> *Router#*


Este modo permite:

- Ejecutar comandos avanzados
- Acceder al modo de configuración
- Guardar configuraciones

Para volver al modo usuario:

````
disable
````


---

### 3. Global Configuration Mode (modo global de configuración)

Desde el modo privilegiado ejecutar el comando:

````
configure terminal
````


Prompt -> *Router(config)#*


Permite realizar configuraciones globales como:

````
hostname R1
ip routing
````


---

### 4. Interface Configuration Mode

Desde modo global:

````
interface {interface_name}
````


Prompt -> *Router(config-if)#*


Ejemplo de configuración:

````
ip address 192.168.1.1 255.255.255.0
no shutdown
description Enlace hacia LAN
````

También se puede acceder a un rango de interfaces ya que nos puede interesar para ahorrar tiempo si la configuración es igual para un grupo de interfaces:

````
interface range {interface_name}
````


---

### 5. Line Configuration Mode

Configuración de la linea de consola o acceso remoto. Ambas sirven para acceder al dispositivo de red y administrarlo desde un ordenador. Por consola se utiliza un cable especial y tienes que estar en el lugar donde se ubica el dispositivo mientras que por acceso remoto se usa telnet o ssh:


````
line console 0
````

````
line vty 0 4
````


Prompt -> *Router(config-line)#*


Ejemplo:

````
password cisco
login
````


---

## Comandos de navegación y ayuda

IOS es jerárquico. Para moverse entre modos:


- `exit` → retrocede un nivel
- `end` → vuelve directamente a modo privilegiado o combinación **ctrl+Z**
- `disable` → vuelve al modo usuario

---

### Ayuda contextual

Usando el signo de interrogación podemos ver la lista de comandos que podemos ejectuar.


Ejemplo:

![](/oscar-olveiraa.github.io/ccna/navegacion_ios/captura1.png)

Si ejecutas un comando que no indentifica la IOS saltará esto:

![](/oscar-olveiraa.github.io/ccna/navegacion_ios/captura2.png)

Para arreglar esto presionas las teclas **ctrl+shift+6** y dentro de la configuración global ejectuas el comando:

````
no ip domain-lookpup
````


---

### Autocompletado

La tecla TAB completa comandos automáticamente.

Ejemplo:

conf[TAB] pasa a autocompletarse como configure

💡OJO: en el caso que haya más opciones para el comando las muestra ya que por ambigüedad no sabe que comando quieres utilizar.

---

### Abreviaciones válidas

Siempre que no haya ambigüedad pueder abreviar, por ejemplo:

````
conf t
int g0/0
````

---

## Guardado de configuración

Para guardar cambios:

````
copy running-config startup-config
````


Forma abreviada:

````
wr
````

Esto se utilizar para cuando tengas que hacer un **reload** de un dispositivo no se pierdan los cambios ya que se guardan en la NVRAM, una memoria no volátil. 

---

## Comandos básicos de verificación recomendados

````
show running-config
show ip interface brief
show interfaces
ping
traceroute
````

---

## Buenas prácticas

- Documentar cada interfaz con `description`
- Verificar antes y después de configurar
- Guardar la configuración tras cambios relevantes

---

## Resumen

Cisco IOS funciona mediante una estructura jerárquica de modos:

1. User EXEC (`>`)
2. Privileged EXEC (`#`)
3. Global Configuration
4. Submodos específicos (interface, line, router…)

Dominar la navegación es el primer paso para administrar dispositivos de red correctamente.