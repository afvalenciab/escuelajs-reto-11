# escuelajs-reto-11
Reto 11 Noviembre 9: Curso de Autenticación con Passport.js

## Platzi Store Backend Secure Login

Ya que tenemos nuestro backend debemos de proteger las principales rutas para no exponer datos sensibles o que comprometan tu servicio.

### Instalación
```
npm install
```

### Ejecución
```
npm run dev
```

## Documentación

### SeedUsers.js

Ejecutar el archivo 'SeedUsers.js' para crear 3 usuarios de prueba para validar el funcionamiento de la API.
Ejecutar con el siguiente comando:
```
DEBUG=app:* && node src/scripts/mongo/seedUsers.js
```

### Archivo routes/auth.js

Se crea el archivo reoutes/auth.js para el manejar el sign-in y sign up de la aplicación.
En el endpoint sig-in se utiliza la estrategia 'Basic' para realizar una autenticación con usuario y contraseña.

### Archivo Services/users.js

Se crear el archivo users.js para manejar los servicios de los usuarios en el cual se implementa el CRUD.

```javascript
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { name, email, password, isAdmin } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin)
    }); 
    
    return createdUserId;
  }

  async getOrCreateUser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });

    if(queriedUser) {
      return queriedUser;
    }

    await this.createUser({ user });
    return await this.getUser({ email: user.email });
  }
```

### Directorio Utils

En este directorio se crean las estrategias de autenticación 'basic' y 'jwt' para el manejo de seguridad de la aplicación.
En la estrategia 'jwt', se utiliza un 'BearerToken', por lo tanto se debe enviar este token en cada petición.

Se crea un middleware llamado 'authValidationHandler', para validar los permisos del usuario.

### Archivo .env

Variables de entorno requeridas para el funcionamiento de la aplicación:
```
//CONFIG
PORT=3000
CORS=*
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_NAME=

//USERS
DEFAULT_ADMIN_PASSWORD=
DEFAULT_USER_PASSWORD=

//AUTH
AUTH_JWT_SECRET=
```

## RETO

### Primer problema

1. Conecta tu proyecto con tu base de datos en Mongo Atlas
2. Muestra correctamente los productos

### Segundo Problema

1. Crea el servicio de autenticación para iniciar sesión con usuario y contraseña

### Tercer Problema

1. Añade la seguridad necesaria para el endpoint de actualizar producto
2. Añade la seguridad necesaria para el endpoint de eliminar producto.

### Enviar solución de reto
Debes de crear un "Fork" de este proyecto, revolver los problemas y crear un Pull Request hacia este repositorio.

### Contribuir
Si alguien quiere agregar o mejorar algo, lo invito a colaborar directamente en este repositorio: [escuelajs-reto-10](https://github.com/platzi/escuelajs-reto-10/)

### Licencia
escuelajs-reto-010 se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).
