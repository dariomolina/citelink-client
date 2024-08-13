# citelink-client

## Documentación de la Api

## Pasos que se realizaron para instalar el front
Para el front use React
* npm create vite@latest
* buscamos e instalamos react router dom https://reactrouter.com/en/main
* npm install react-router-dom

### Levantar el cliente

Comandos para buildear las imagenes
```
docker-compose build
```

Levantar la app
```
docker-compose up
```

entrar a 
```
htpp://localhost:3000
```

Para probar esto, nos descargamos el proyecto de backend en https://github.com/dariomolina/cintelink-challenge y seguir
las instrucciones del README para levantarlo y crear los registros necesarios en la db. 

* Debemos obtener el Token (access) para poder conectarnos al websocket con las 
credenciales de algun usuario ya registrado (en este caso se usa el usuario admin)
```
POST http://localhost:8000/api/token/
Body
{
    "username": "admin",
    "password": "admin"
}

Response:
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMzY1MjI3NCwiaWF0IjoxNzIzNTY1ODc0LCJqdGkiOiJiYzk4Y2FmMWE5ODI0MGYzYmFkOGQ0YTMyOGEwY2ZiNSIsInVzZXJfaWQiOjF9.4uz-fnFs_h1eQj02eWyGIVgU3rlhwCy0B7igVhmwmGM",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzNTY5NDE0LCJpYXQiOjE3MjM1NjU4NzQsImp0aSI6IjY4ZDAyOGQ5MGZiOTQ3YjdiYjE0NTRjNzRlNDIyZGJlIiwidXNlcl9pZCI6MX0._YI6uIqpRElPAaLGAx2_eN3E-9jAyCWq1UOgKB6UNts"
}
```

* con el TOKEN "access" obtenido, lo asignamos a la variable VITE_WS_TOKEN del archivo .env, ubicado en frontend/.env. Esto es para
poder conectarse al websocket con el usuario correspondiente.


Luego de eso, podemos ingresar a postman y crear Notifications en el backend [ POST http://localhost:8000/api/notifications/ ].
Este endpoint creará y enviará notificaciones mediante django-channels a todos los users con el tag con id igual 1 
segun este ejemplo:
```
Estructura del body
{
    "message": <string>,
    "tag": <tag_id> Este registro con el id que se desea enviar, debe existir en la db
}



POST http://localhost:8000/api/notifications/

Body:
{
    "message": "nueva notificacion",
    "tag": 1
}

Response:
{
    "id": 55,
    "tag": 1,
    "message": "nueva notificacion",
    "timestamp": "2024-08-13T14:46:38.346597Z"
}
```
Luego en htpp://localhost:3000 podemos observar, en el apartado de Notifications, cómo en tiempo real van apareciendo las notificaciones al momento de crear un registro de notificaciones en la db.
En el apartado "All Notifications" se listan todas las notificaciones que tiene el user, teniendo la posibilidad de marcar como leido
y de eliminarlo (eso básicamente marca las notificaciones a nivel base de datos como leida y borrada, pero el borrado es sólo de manera logica, dado que el registro segirá existiendo, pero con el flag is_deleted=True)
