---
layout: default
title: Configuración básica de dispositivos
---

# Configuración básica de dispositivos

## Establecer nombres

Para cambiar el nombre a un dispositivo se ejecuta el siguiente comando en la configuración global:

````bash
hostname S1
````

Dando como resultado lo siguiente:

![](/ccna/configuracion_basica/captura3.png)


🚨 IMPORTANTE:

◇ Comenzar con una letra.

◇ No contener espacios.

◇ Finalizar con una letra o dígito.

◇ Utilizar únicamente letras, dígitos y guiones.

◇ Tener menos de 64 caracteres de longitud.

## Configurar contraseñas

Para proteger el modo EXEC del usuario ejectuamos los siguientes comandos:

![](/ccna/configuracion_basica/captura4.png)


Para protefer el modo EXEC privilegaido ejecutamos el siguiente comando en el modo configuración global:

 ````bash
 enable secret {contraseña}
 ````


Para proteger las líneas para el acceso remoto ejecutamos los siguientes comandos. Importante destacar que en este proceso se activa tambien SSH ya que Telnet no es un protocolo seguro:

![](/ccna/configuracion_basica/captura5.png)

El nombre del dominio es un ejemplo, el tamaño de la clave RSA tiene que ser mínimo de 1024 y ser base 2 (osea 512,1024,2048,4096...), el tiempo que se establece en el comando *exec-timeout* es en minutos y se aplica cuando el administrador queda con la conexión inactiva, entonces se cierra automáticamente pasados esos minutos.


Para encriptar las contraseñas en los archivos startup-config y running-config ejectuamos el siguiente comando el modo configuración global:

````bash
service password-encryption
````

Para establecer la longitud mínima en las contraseñas se usa el siguiente comando en el modo de configuración global:

````
security password min-length {length}
````

Para evitar ataques de fuerza bruta estableces un máximo de intentos en x segundos con el siguiente comando en el modo de configuración global:

````
login block-for {time} attempts {n-attempts} within {time}
````

🚨 IMPORTANTE: destacar que cuando usamos **secret** en vez de **password**, las contraseñas ya se encriptan solas.

Para mostrar un mensaje banner, ejecutamos el siguiente comando en el modo de configuración global:

````bash
banner motd #Only authorized people#
````
🚨 IMPORTANTE: esto es importante para advertir a personal no autorizado al intentar acceder, además el símbolo '#' se usa como carácter delimitador.

## Comandos para prueba de conectividad

Desde el modo de usuario o privilegiado podemos comprobar la conexión a otros dispositivos con los siguientes comandos:

````
ping {ip-address}
traceroute {ip-address}
````