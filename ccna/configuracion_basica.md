---
layout: default
title: Configuración básica de dispositivos
---

# Configuración básica de dispositivos

## Establecer nombres

Para cambiar el nombre a un dispositivo se ejecuta el siguiente comando en la configuración global:

````
hostname S1
````

Dando como resultado lo siguiente:

![](/ccna/configuracion_basica/captura3.png)


🚨 IMPORTANTE:

* Comenzar con una letra.

* No contener espacios.

* Finalizar con una letra o dígito.

* Utilizar únicamente letras, dígitos y guiones.

* Tener menos de 64 caracteres de longitud.

## Configurar contraseñas

Para proteger el modo EXEC del usuario ejectuamos los siguientes comandos:

![](/ccna/configuracion_basica/captura4.png)


Para protefer el modo EXEC privilegaido ejecutamos el siguiente comando en el modo configuración global:
 ````
 enable secret {contraseña}
 ````


Para proteger las líneas para el acceso remoto ejecutamos los siguientes comandos:

![](/ccna/configuracion_basica/captura5.png)


Para encriptar las contraseñas en los archivos startup-config y running-config ejectuamos el siguiente comando el modo configuración global:

````
service password-encryption
````

🚨 IMPORTANTE: destacar que cuando usamos **secret** en vez de **password**, las contraseñas ya se encriptan solas.

Para mostrar un mensaje banner, ejecutamos el siguiente comando en el modo de configuración global:

````
banner motd #Only authorized people#
````
🚨 IMPORTANTE: esto es importante para advertir a personal no autorizado al intentar acceder, además el símbolo '#' se usa como carácter delimitador.

## Configuración interfaz virtual en un switch

Para acceder a un switch de forma remota se configura una SVI (Switch Virtual Interface), dentro de la configuración global:

![](/ccna/navegacion_ios/captura6.png)

