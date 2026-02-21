---
layout: default
title: Navegación en Cisco IOS
---

# Navegación en Cisco IOS

La administración de routers y switches Cisco se realiza a través del sistema operativo **Cisco IOS (Internetwork Operating System)**.

Comprender su estructura jerárquica de modos es fundamental para realizar configuraciones correctamente y evitar errores.

---

## Modos de operación en IOS

Cisco IOS utiliza distintos niveles jerárquicos de acceso. Cada modo permite ejecutar determinados comandos.

---

### 1. User EXEC Mode

Es el primer modo al acceder al dispositivo.


Router>


Permite ejecutar comandos básicos de verificación.

Ejemplos:


show version
show ip interface brief
ping 192.168.1.1


No permite realizar configuraciones.

---

### 2. Privileged EXEC Mode

Se accede desde el modo usuario con:


enable


El prompt cambia a:


Router#


Este modo permite:

- Ejecutar comandos avanzados
- Acceder al modo de configuración
- Guardar configuraciones

Para volver al modo usuario:


disable


---

### 3. Global Configuration Mode

Desde el modo privilegiado:


configure terminal


Prompt:


Router(config)#


Permite realizar configuraciones globales como:


hostname R1
ip routing


---

### 4. Interface Configuration Mode

Desde modo global:


interface gigabitEthernet 0/0


Prompt:


Router(config-if)#


Ejemplo de configuración:


ip address 192.168.1.1 255.255.255.0
no shutdown
description Enlace hacia LAN


---

### 5. Line Configuration Mode

Configuración de consola o acceso remoto:


line console 0


o


line vty 0 4


Prompt:


Router(config-line)#


Ejemplo:


password cisco
login


---

## Comandos de navegación

IOS es jerárquico. Para moverse entre modos:


exit
end
disable


- `exit` → retrocede un nivel
- `end` → vuelve directamente a modo privilegiado
- `disable` → vuelve al modo usuario

---

## Ayuda y productividad

IOS incorpora herramientas muy útiles.

### Ayuda contextual


?


Ejemplo:


show ?


Muestra los comandos disponibles relacionados.

---

### Autocompletado

La tecla TAB completa comandos automáticamente.

Ejemplo:


conf<TAB>


Se convierte en:


configure


---

### Abreviaciones válidas

Siempre que no haya ambigüedad:


conf t
int g0/0
sh ip int br


---

## Guardado de configuración

Para guardar cambios:


copy running-config startup-config


Forma abreviada:


wr


---

## Comandos básicos de verificación recomendados


show running-config
show ip interface brief
show interfaces


---

## Buenas prácticas

- Documentar cada interfaz con `description`
- Verificar antes y después de configurar
- Guardar la configuración tras cambios relevantes
- Mantener orden jerárquico al configurar

---

## Resumen

Cisco IOS funciona mediante una estructura jerárquica de modos:

1. User EXEC (`>`)
2. Privileged EXEC (`#`)
3. Global Configuration
4. Submodos específicos (interface, line, router…)

Dominar la navegación es el primer paso para administrar dispositivos de red correctamente.