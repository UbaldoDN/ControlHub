# API de ControlHub

## Nota:
En todas las solicitudes realizadas deben tener la cabecera "User-Role" y tiene 3 valores "admin", "teacher" y "student", estoy simulando que existe un usuario logeado con roles en especifico para poder acceder a sus rutas correspondiente, la cabecera es la siguiente:

```json
    User-Role = admin || teacher || student
```

## Nota 2:
Cree un endpoint para poblar con cursos, lecciones y preguntas de cada tipo, se encuentra en la carpeta:

```bash
    #Role Admin/Users/Generate Data
    http://localhost:9000/api/users/generateData
```

## Instalación y Configuración

### Elección
- **Express**: Me base en su eficiencia y flexibilidad para desarrollar APIs.
- **Mongoose**: Te ayuda agilizar y a simplificar la interacción con la DB.

### Frameworks y Bibliotecas Utilizados
- **Express**: Utilizado como el framework principal para la creación de la API debido a su simplicidad y flexibilidad. Es un framework que estoy aprendiendo asi que el motivo fue para poner a prueba tambien mis conocimientos.
- **Mongoose**: Base de Datos No Relacional, utilizado para modelar y gestionar los datos de MongoDB. Lo mismo que con el framework, lo estoy aprendiendo y quise aplicarlo.

### Docker

#### Instalación de Docker
Si aún no tienes Docker instalado en tu máquina, sigue estos pasos:
- **Windows y macOS**: Descarga e instala Docker Desktop desde [Docker Hub](https://www.docker.com/products/docker-desktop).
- **Linux**: Sigue las instrucciones de instalación específicas para tu distribución en [Docker Docs](https://docs.docker.com/engine/install/).

#### Iniciar Contenedores con Docker Compose

1. Clona este repositorio en tu máquina local:

   ```bash
    git clone https://github.com/UbaldoDN/controlhub.git
   ```

2. Navega a la carpeta provision donde se encuentra el archivo docker-compose.yml:

   ```bash
    cd controlhub/provision
   ```

3. Inicia los contenedores con Docker Compose:

   ```bash
    docker-compose up -d
   ```

### Thunder Client
Para probar los endpoints de la API, puedes usar Thunder Client, una extensión de Postman para Visual Studio Code. Aquí te mostramos cómo configurar Thunder Client para usarlo con esta API.

#### Instalación de Visual Studio Code

Si aún no tienes Visual Studio Code instalado en tu máquina, sigue estos pasos:
- **Windows**: Descarga el instalador desde [Visual Studio Code](https://code.visualstudio.com/) y sigue las instrucciones de instalación.
- **macOS**: Descarga el instalador desde [Visual Studio Code](https://code.visualstudio.com/) y sigue las instrucciones de instalación.
- **Linux**: Dependiendo de tu distribución, puedes seguir las instrucciones de instalación desde la [documentación oficial](https://code.visualstudio.com/docs/setup/linux).

#### Instalación de Thunder Client
Una vez que tienes Visual Studio Code instalado:
1. Abre Visual Studio Code.
2. Ve a la sección de extensiones (icono de cuadrados en la barra lateral izquierda o `Ctrl+Shift+X`).
3. Busca "Thunder Client".
4. Haz clic en "Instalar" en la extensión de Thunder Client.

#### Configuración de Thunder Client
- Abre Visual Studio Code.
- Haz clic en el icono de Thunder Client en la barra lateral izquierda.
- Crea una nueva carpeta de entorno llamada "ControlHub".
- En esta carpeta, crea una nueva petición para cada endpoint que quieras probar.

## Uso de la API

## Admin
### Usuarios
#### Obtener Todos los Usuarios
**Endpoint**: `GET /api/users`
**Descripción**: Obtener una lista de todos los usuarios.
**Respuesta Exitosa**:
```json
    [
        {
            "id": "user id",
            "firstName": "user firstName",
            "lastName": "user lastName",
            "email": "user email",
            "role": "user role"
        },
    ]
```
#### Obtener Un Solo Usuario
**Endpoint**: `GET /api/users/:userId`
**Descripción**: Obtener un usuario.
**Respuesta Exitosa**:
```json
    {
        "id": "user id",
        "firstName": "user firstName",
        "lastName": "user lastName",
        "email": "user email",
        "role": "user role"
    },
```

#### Crear Un Usuario
**Endpoint**: `POST /api/users`
**Descripción**: Crear un usuario.
**Solicitud**:
```json
    {
        "firstName": "first name",
        "lastName": "last name",
        "email": "email",
        "role": "role" // admin, teacher and student
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "user id",
        "firstName": "user firstName",
        "lastName": "user lastName",
        "email": "user email",
        "role": "user role"
    }
```

#### Actualizar Un Usuario
**Endpoint**: `PUT /api/users/:userId`
**Descripción**: Actualizar un usuario.
**Solicitud**:
```json
    {
        "firstName": "first name",
        "lastName": "last name",
        "email": "email",
        "role": "role" // admin, teacher and student
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "user id",
        "firstName": "user firstName",
        "lastName": "user lastName",
        "email": "user email",
        "role": "user role"
    }
```

#### Eliminación de un Usuario
**Endpoint**: `DELETE /api/users/:userId`
**Descripción**: Eliminar un usuario.
**Respuesta Exitosa**:
```json
    {
        "Status": "204 No Content"
    }
```

## Profesor
### Cursos
#### Obtener Todos los Cursos
**Endpoint**: `GET /api/courses`
**Descripción**: Obtener una lista de todos los cursos.
**Respuesta Exitosa**:
```json
    [
        {
            "id": "curso_id",
            "title": "Título del Curso",
            "isApproved": false,
            "isAvailable": false,
            "lessons": [{
                    "id": "lesson_id_1",
                    "title": "lesson_title_1",
                    "threshold": 100,
                    "isAvailable": false
                },{
                    "id": "lesson_id_2",
                    "title": "lesson_title_2",
                    "threshold": 90,
                    "isAvailable": false
                },
            ]
        },
    ]
```
#### Obtener Un Solo Curso
**Endpoint**: `GET /api/courses/:courseId`
**Descripción**: Obtener un curso.
**Respuesta Exitosa**:
```json
    {
        "id": "curso_id",
        "title": "Título del Curso",
        "isApproved": false,
        "isAvailable": false,
        "lessons": [{
                "id": "lesson_id_1",
                "title": "lesson_title_1",
                "threshold": 100,
                "isAvailable": false
            },{
                "id": "lesson_id_2",
                "title": "lesson_title_2",
                "threshold": 90,
                "isAvailable": false
            },
        ]
    }
```

#### Crear Un Curso
**Endpoint**: `POST /api/courses`
**Descripción**: Crear un curso.
**Solicitud**:
```json
    {
        "title": "Título del Curso"
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "curso_id",
        "title": "Título del Curso",
        "isApproved": false,
        "isAvailable": false,
        "lessons": []
    }
```

#### Actualizar Un Curso
**Endpoint**: `PUT /api/courses/:courseId`
**Descripción**: Actualizar un curso.
**Solicitud**:
```json
    {
        "title": "Título del Curso"
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "curso_id",
        "title": "Título del Curso",
        "isApproved": false,
        "isAvailable": false,
        "lessons": []
    }
```

#### Actualizar Aprobación Un Curso
**Endpoint**: `PUT /api/courses/:courseId/approved`
**Descripción**: Actualizar aprobación de un curso.
**Solicitud**:
```json
    {
        "approved": true // false
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "curso_id",
        "title": "Título del Curso",
        "isApproved": true,
        "isAvailable": false,
        "lessons": []
    }
```

#### Actualizar Disponibilidad Un Curso
**Endpoint**: `PUT /api/courses/:courseId/available`
**Descripción**: Actualizar disponibilidad de un curso.
**Solicitud**:
```json
    {
        "available": true // false
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "curso_id",
        "title": "Título del Curso",
        "isApproved": false,
        "isAvailable": true,
        "lessons": []
    }
```

#### Eliminación de un Curso
**Endpoint**: `DELETE /api/courses/:courseId`
**Descripción**: Eliminar un curso.
**Respuesta Exitosa**:
```json
    {
        "Status": "204 No Content"
    }
```

### Lecciones
#### Obtener Todos las Lecciones
**Endpoint**: `GET /api/courses/:courseId/lessons`
**Descripción**: Obtener una lista de todas las lecciones.
**Respuesta Exitosa**:
```json
    [
        {
            "id": "lesson_id",
            "title": "Título de la Lección",
            "passingThreshold": 80,
            "isAvailable": false,
            "questions": [{
                    "id": "lesson_id_1",
                    "title": "lesson_title_1",
                    "threshold": 100,
                    "isAvailable": false
                },{
                    "id": "lesson_id_2",
                    "title": "lesson_title_2",
                    "threshold": 90,
                    "isAvailable": false
                },
            ]
        },
    ]
```
#### Obtener Una Sola Lección
**Endpoint**: `GET /api/courses/:courseId/lessons/:lessonId`
**Descripción**: Obtener una lección.
**Respuesta Exitosa**:
```json
    {
    
        "id": "lesson_id_1",
        "title": "lesson_title_1",
        "threshold": 100,
        "isAvailable": false, 
        "questions": []
    }
```

#### Crear Una Lección
**Endpoint**: `POST /api/courses/:courseId/lessons`
**Descripción**: Crear una lección.
**Solicitud**:
```json
    {
        "title": "Titulo Lección",
        "threshold": 90
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "lesson_id_1",
        "title": "lesson_title_1",
        "threshold": 90,
        "isAvailable": false, 
        "questions": []
    }
```

#### Actualizar Un Curso
**Endpoint**: `PUT /api/courses/:courseId/lessons/:lessonId`
**Descripción**: Actualizar una lección.
**Solicitud**:
```json
    {
        "title": "Titulo Lección",
        "threshold": 90
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "lesson_id_1",
        "title": "lesson_title_1",
        "threshold": 90,
        "isAvailable": false, 
        "questions": []
    }
```

#### Actualizar Disponibilidad Un Curso
**Endpoint**: `PUT /api/courses/:courseId/lessons/:lessonId/available`
**Descripción**: Actualizar disponibilidad de una lección.
**Solicitud**:
```json
    {
        "available": true // false
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "lesson_id_1",
        "title": "lesson_title_1",
        "threshold": 90,
        "isAvailable": true, 
        "questions": []
    }
```

#### Eliminación de un Curso
**Endpoint**: `DELETE /api/courses/:courseId/lessons/:lessonId`
**Descripción**: Eliminar una lección.
**Respuesta Exitosa**:
```json
    {
        "Status": "204 No Content"
    }
```

### Lecciones
#### Obtener Todos las Lecciones
**Endpoint**: `GET /api/courses/:courseId/lessons`
**Descripción**: Obtener una lista de todas las lecciones.
**Respuesta Exitosa**:
```json
    [
        {
            "id": "lesson_id",
            "title": "Título de la Lección",
            "passingThreshold": 80,
            "isAvailable": false,
            "questions": [{
                    "id": "lesson_id_1",
                    "title": "lesson_title_1",
                    "threshold": 100,
                    "isAvailable": false
                },{
                    "id": "lesson_id_2",
                    "title": "lesson_title_2",
                    "threshold": 90,
                    "isAvailable": false
                },
            ]
        },
    ]
```

#### Obtener Una Sola Lección
**Endpoint**: `GET /api/courses/:courseId/lessons/:lessonId`
**Descripción**: Obtener una lección.
**Respuesta Exitosa**:
```json
    {
    
        "id": "lesson_id_1",
        "title": "lesson_title_1",
        "threshold": 100,
        "isAvailable": false, 
        "questions": []
    }
```

#### Crear Una Lección
**Endpoint**: `POST /api/courses/:courseId/lessons`
**Descripción**: Crear una lección.
**Solicitud**:
```json
    {
        "title": "Titulo Lección",
        "threshold": 90
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "lesson_id_1",
        "title": "lesson_title_1",
        "threshold": 90,
        "isAvailable": false, 
        "questions": []
    }
```

#### Actualizar Una Lección
**Endpoint**: `PUT /api/courses/:courseId/lessons/:lessonId`
**Descripción**: Actualizar una lección.
**Solicitud**:
```json
    {
        "title": "Titulo Lección",
        "threshold": 90
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "lesson_id_1",
        "title": "lesson_title_1",
        "threshold": 90,
        "isAvailable": false, 
        "questions": []
    }
```

#### Actualizar Disponibilidad Una Lección
**Endpoint**: `PUT /api/courses/:courseId/lessons/:lessonId/available`
**Descripción**: Actualizar disponibilidad de una lección.
**Solicitud**:
```json
    {
        "available": true // false
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "lesson_id_1",
        "title": "lesson_title_1",
        "threshold": 90,
        "isAvailable": true, 
        "questions": []
    }
```

#### Eliminación de una Lección
**Endpoint**: `DELETE /api/courses/:courseId/lessons/:lessonId`
**Descripción**: Eliminar una lección.
**Respuesta Exitosa**:
```json
    {
        "Status": "204 No Content"
    }
```

### Preguntas
#### Obtener Todos las Preguntas
**Endpoint**: `GET /api/courses/:courseId/lessons/:lessonId/questions`
**Descripción**: Obtener una lista de todas las preguntas.
**Respuesta Exitosa**:
```json
    [
        {
            "id": "question_id",
            "type": "question_type",
            "content": "question_content",
            "answers": [
                "question_asnwer_1",
                "question_asnwer_2"
            ],
            "correctAnswers": [
                "question_correct_answer_1"
            ],
            "points": 10
        },
        {
            "id": "question_id_2",
            "type": "question_type_2",
            "content": "question_content_2",
            "answers": [
                "question_asnwer_2_1",
                "question_asnwer_2_2"
            ],
            "correctAnswers": [
                "question_correct_answer_2_1"
            ],
            "points": 10
        },
    ]
```

#### Obtener Una Sola Pregunta
**Endpoint**: `GET /api/courses/:courseId/lessons/:lessonId/questions/:questionId`
**Descripción**: Obtener una pregunta.
**Respuesta Exitosa**:
```json
    {
        "id": "question_id",
        "type": "question_type",
        "content": "question_content",
        "answers": [
            "question_asnwer_1",
            "question_asnwer_2"
        ],
        "correctAnswers": [
            "question_correct_answer_1"
        ],
        "points": 10
    }
```

#### Crear Una Pregunta
**Endpoint**: `POST /api/courses/:courseId/lessons/:lessonId/questions`
**Descripción**: Crear una pregunta.
**Solicitud**:
```json
    {
        "type": "all", // boolean, single, multi, all
        "content": "question_content", // Question
        "answers": ["answer_1", "answer_2", "answer_3", "answer_4"], // Min = 2, Max = 6
        "correctAnswers": ["correct_answer_1", "correct_answer_2"], // Depend the type
        "points": 10
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "question_id",
        "type": "question_type",
        "content": "question_content",
        "answers": [
            "question_asnwer_1",
            "question_asnwer_2"
        ],
        "correctAnswers": [
            "question_correct_answer_1"
        ],
        "points": 10
    }
```

#### Actualizar Una Pregunta
**Endpoint**: `PUT /api/courses/:courseId/lessons/:lessonId/questions/:questionId`
**Descripción**: Actualizar una pregunta.
**Solicitud**:
```json
    {
        "type": "all", // boolean, single, multi, all
        "content": "question_content", // Question
        "answers": ["answer_1", "answer_2", "answer_3", "answer_4"], // Min = 2, Max = 6
        "correctAnswers": ["correct_answer_1", "correct_answer_2"], // Depend the type
        "points": 10
    }
```
**Respuesta Exitosa**:
```json
    {
        "id": "question_id",
        "type": "question_type",
        "content": "question_content",
        "answers": [
            "question_asnwer_1",
            "question_asnwer_2"
        ],
        "correctAnswers": [
            "question_correct_answer_1"
        ],
        "points": 10
    }
```

#### Eliminación de una Pregunta
**Endpoint**: `DELETE /api/courses/:courseId/lessons/:lessonId/questions/:questionId`
**Descripción**: Eliminar una pregunta.
**Respuesta Exitosa**:
```json
    {
        "Status": "204 No Content"
    }
```

## Estudiante
#### Obtener Todos los Cursos Disponibles
**Endpoint**: `GET /api/student/:studentId/courses`
**Descripción**: Obtener una lista de todos los cursos disponibles.
**Respuesta Exitosa**:
```json
    [
        {
            "id": "course id",
            "title": "course title",
            "isApproved": false,
            "isAvailable": true,
            "lessons": [
                {
                    "id": "lesson id",
                    "title": "lesson title",
                    "threshold": 70,
                    "isAvailable": true,
                    "questions": [
                        {
                            "id": "question id 1",
                            "type": "question type 1",
                            "content": "question content 1",
                            "answers": [
                                "question_answer 1_1",
                                "question_answer 1_2"
                            ],
                            "correctAnswers": [
                                "question_correct_answer 1_1"
                            ],
                            "points": 10
                        },
                        {
                            "id": "question id 2",
                            "type": "question type 2",
                            "content": "question content 2",
                            "answers": [
                                "question_answer 2_1",
                                "question_answer 2_2"
                            ],
                            "correctAnswers": [
                                "question_correct_answer 2_1"
                            ],
                            "points": 10
                        }
                    ]
                }
            ]
        }
    ]
```

#### Obtener Todos los Cursos Matriculados
**Endpoint**: `GET /api/student/:studentId/enrolls`
**Descripción**: Obtener una lista de todos los cursos matriculados.
**Respuesta Exitosa**:
```json
    {
        "id": "student id",
        "firstName": "studen firstname",
        "lastName": "student lastname",
        "email": "student email",
        "enrolledCourses": [
            {
            "id": "enroll course id",
            "title": "enroll course title",
            "isApproved": false,
            "isAvailable": true
            }
        ]
    }
```

#### Desmatricularse de un Curso
**Endpoint**: `POST /api/students/:studentId/courses/:courseId/unenroll`
**Descripción**: Desmatricualrse de un curso.
**Respuesta Exitosa**:
```json
    {
        "message": "Te desmatriculaste del curso exitosamente."
    }
```

#### Matricularse a un Curso
**Endpoint**: `POST /api/students/:studentId/courses/:courseId/enroll`
**Descripción**: Matricularse a un curso.
**Respuesta Exitosa**:
```json
    {
        "message": "Te matriculaste del curso exitosamente."
    }
```

#### Obtener detalle de un Curso Disponible
**Endpoint**: `GET /api/students/:studentId/courses/:courseId`
**Descripción**: Detalle de un curso.
**Respuesta Exitosa**:
```json
    {
        "id": "course id",
        "title": "course title",
        "isApproved": false,
        "isAvailable": true,
        "lessons": [
            {
                "id": "lesson id",
                "title": "lesson title",
                "threshold": 70,
                "isAvailable": true,
                "questions": [
                    {
                        "id": "question id 1",
                        "type": "question type 1",
                        "content": "question content 1",
                        "answers": [
                            "question_answer 1_1",
                            "question_answer 1_2"
                        ],
                        "correctAnswers": [
                            "question_correct_answer 1_1"
                        ],
                        "points": 10
                    },
                    {
                        "id": "question id 2",
                        "type": "question type 2",
                        "content": "question content 2",
                        "answers": [
                            "question_answer 2_1",
                            "question_answer 2_2"
                        ],
                        "correctAnswers": [
                            "question_correct_answer 2_1"
                        ],
                        "points": 10
                    }
                ]
            }
        ]
    }
```