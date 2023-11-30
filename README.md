```markdown
# Proyecto de API con Express

Este proyecto implementa una API simple utilizando el framework Express en Node.js. La API gestiona usuarios y proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Configuración

1. **Clonación del Repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Instalación de Dependencias:**
   ```bash
   npm install
   ```

3. **Configuración de Variables de Entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega tu clave de API:
     ```plaintext
     API_KEY=TU_CLAVE_API
     ```

4. **Iniciar la Aplicación:**
   ```bash
   npm start
   ```

## Estructura del Proyecto

```plaintext
/proyecto
├── README.md
├── app.js
├── package.json
└── .env
```

## Middleware de Validación de API Key

Se utiliza un middleware para validar la clave de API antes de procesar las solicitudes. Este middleware se encuentra en la función `apiKeyValidation`.

```javascript
const apiKeyValidation = (req, res, next) => {
  const userApiKey = req.get("x-api-key");
  if (userApiKey && userApiKey === API_KEY) {
    next();
  } else {
    res.status(401).send('Invalid API key');
  }
};
app.use(express.json());
app.use(apiKeyValidation);
```

## Rutas de la API

### Obtener todos los usuarios

```http
GET /users
```

Parámetros de consulta:
- `name` (opcional): Filtra los usuarios por nombre.

### Obtener usuario por apellido

```http
GET /users/lastname/:lastname
```

Parámetros de ruta:
- `lastname`: Apellido del usuario a buscar.

### Obtener usuario por ID

```http
GET /users/id/:id
```

Parámetros de ruta:
- `id`: ID del usuario a buscar.

### Crear un nuevo usuario

```http
POST /users
```

Cuerpo de la solicitud (en formato JSON):
```json
{
  "name": "Nombre",
  "Lastname": "Apellido"
}
```

### Actualizar usuario por ID

```http
PUT /users/:id
```

Parámetros de ruta:
- `id`: ID del usuario a actualizar.

Cuerpo de la solicitud (en formato JSON):
```json
{
  "name": "NuevoNombre",
  "Lastname": "NuevoApellido"
}
```

### Eliminar usuario por ID

```http
DELETE /users/:id
```

Parámetros de ruta:
- `id`: ID del usuario a eliminar.

## Ejemplos de Uso

### Obtener todos los usuarios

```http
GET http://localhost:3000/users
```

### Obtener usuario por ID

```http
GET http://localhost:3000/users/id/0
```

### Crear un nuevo usuario

```http
POST http://localhost:3000/users

{
  "name": "Nuevo",
  "Lastname": "Usuario"
}
```

## Contribuciones

¡Siéntete libre de contribuir al proyecto abriendo problemas o enviando solicitudes de extracción!

