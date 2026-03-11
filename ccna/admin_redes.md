---
layout: default
title: Administración de redes
---

# Administración de redes

## Detección de dispositivos con CDP (Cisco Discovery Protocol)

Para deshabilitar CDP globalmente en un dispositivo, usar el comando **no cdp run**.

Para habilitar CDP globalmente, usar el comando **cdp run**.

Para deshabilitar CDP en un puerto, usar el comando de configuración de interfaz **no cdp enable**. 

Para habilitar CDP en un puerto, usar el comando de configuración de interfaz **cdp enable**.

Para mostrar las interfaces que están habilitadas en CDP en el dispositivo **show cdp interface**.

Para mostrar el diseño de la red **show cdp neighbors** o **show cdp neighbors detail** .

## Detección de dispositivos con LLDP (Link Layer Discovery Protocol)

Para deshabilitar LLDP globalmente en un dispositivo, usar el comando **no lldp run**.

Para habilitar LLDP globalmente, usar el comando **lldp run**.

Para configurar interfaces específicas debe hacerse por separado para transmitir y recibir paquetes LLDP, dentro de la configuración de la interfaz -> **lldp transmit** o **lldp receive**

Para mostrar si está habilitado LLDP en un dispositivo **show lldp**.

Para mostrar el diseño de la red **show lldp neighbors** o **show lldp neighbors detail**.

## NTP (Network Time Protocol)

Para ver la hora actual con detalle -> **show clock detail**

Para establecer el tiempo por NTP con un servidor, dentro de la configuración global -> **ntp server {ip-address}**

Una vez que establecemos conexión NTP con el servidor, el comando para ver la hora mostrará lo siguiente:

![](/ccna/admin_redes/captura1.png)

Comandos de verificación -> **show ntp associations** y **show ntp status**


## Mantenimiento de archivos

◇ Para ver el sistema de archivos del dispositivo -> **show file systems**

◇ La memoria flash es el sistema de archivos predeterminado, para enumerar el contenido de flash, en modo privilegiado -> **dir**

![](/ccna/admin_redes/captura2.png)

◇ Para cambiar de directorio -> **cd**

◇ Para mostrar el directorio actual -> **pwd**

💡 OJO: los dos últimos comandos no funcionan en packet tracer, ejemplo en un router de verdad:

![](/ccna/admin_redes/captura3.png)

◇ Para crear copias de seguridad con un servidor remoto:

1) Introducir el comando en el modo privilegiado **copy running-config tftp**

2) Introducir la dirección IP del host en el cual se almacenará el archivo de configuración.

3) Introducir el nombre que se asignará al archivo de configuración.

4) Presione 'Enter' para confirmar cada elección.

![](/ccna/admin_redes/captura4.png)

◇ Para restaurar las copias de seguridad con un servidor remoto:

1) Introducir el comando **copy tftp running-config**.

2) La dirección IP del host en el que está almacenado el archivo de configuración.

3) Introducir el nombre que se asignará al archivo de configuración.

4) Presionar 'Enter' para confirmar cada elección.


También se puede crear copias y restaurarlas con un pendrive -> **copy run usbflash0:/**


## Recuperación de contraseñas

1) Ingresar en el modo ROMMON. Para ello reiniciar el dispositivo (reload) y mientras arranca interrumpir el arranque (ctrl+c), quedando la terminal con el siguiente prompt:

![](/ccna/admin_redes/captura5.png)

2) Cambiar el registro de configuración:

![](/ccna/admin_redes/captura6.png)

3) Una vez el dispositivo se haya reiniciado, copiar el startup-config en la running-config.

4) Cambiar la contraseña que deseas modificar

5) Guardar el running-config como el nuevo startup-config, dentro del modo de configuración global -> **config-register 0x2102**

6) Reiniciar el dispositivo, en el modo privilegiado -> **reload**


## Administración de imágenes de IOS

Para copiar una imagen de un servidor a tu dispositivo (sea porque la imagen actual está corrupta o desactualizada):

1)Verificar la cantidad de flash libre. Con el comando **show flash:** comparar el espacio disponible en la memoria flash con el tamaño del nuevo archivo de imagen.

2)Copiar la imagen IOS del servidor al dispositivo de red. Pedirá la dirección IP del servidor y el nombre de la imagen a copiar en el dispositivo -> **copy tftp flash**

3)Arrancar la nuenva imagen. Dentro de la configuración global -> **boot system flash:{ios_name}

4)Guardar la configuración -> **wr**