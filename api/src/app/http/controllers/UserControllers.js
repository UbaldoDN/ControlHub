import UserServices from "../services/UserServices.js";
import CourseServices from "../services/CourseServices.js";
import LessonServices from "../services/LessonServices.js";
import QuestionServices from "../services/QuestionServices.js";

const index = async (request, response) => {
    try {
        const users = await UserServices.list();
        if (!users) {
            return response.json([]);
        }
        
        const userList = await Promise.all(users.map(async (user) => {
            return await responseJsonFormat(user)
        }));

        response.json(userList);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de usuarios." })
    }
};

const store = async (request, response) => {
    try {
        const { firstName, lastName, email, role } = request.body;
        const user = await UserServices.store(firstName, lastName, email, role);
        response.status(201).json(await responseJsonFormat(user));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar un usuario.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {      
        const { userId } = request.params;
        const { firstName, lastName, email, role } = request.body;
        const user = await UserServices.update(firstName, lastName, email, role, userId);
        response.json(await responseJsonFormat(user));
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar un usuario.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        const { userId } = request.params;
        const user = await UserServices.get(userId);
        response.json(await responseJsonFormat(user));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener un usuario." })
    }
};

const destroy = async (request, response) => {
    try {
        const { userId } = request.params;
        await UserServices.destroy(userId);
        response.status(204).json();
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar un usuario." })
    }
};

const createCourses = async () => {
    try {
        const courses = [
            {
                title: "Matemáticas Básicas",
                lessons: [
                    { title: "Números Naturales", threshold: 80, questions: [
                        { type: "boolean", content: "¿El número 1 es un número compuesto?", answers: ["Verdadero", "Falso"], correctAnswers: ["Falso"], points: 10 },
                        { type: "single", content: "¿Cuál es el resultado de 5 - 2?", answers: ["2", "3", "4", "5"], correctAnswers: ["3"], points: 10 },
                        { type: "multiple", content: "¿Cuáles de los siguientes números son primos?", answers: ["2", "3", "4", "5", "6"], correctAnswers: ["2", "3", "5"], points: 10 },
                        { type: "all", content: "¿Cuáles de los siguientes números son múltiplos de 3?", answers: ["1", "2", "3", "4", "5", "6", "7"], correctAnswers: ["3", "6"], points: 10 }
                      ] },
                    { title: "Operaciones Básicas", threshold: 70, questions: [
                        { type: "boolean", content: "¿El resultado de 2 + 3 es 6?", answers: ["Verdadero", "Falso"], correctAnswers: ["Falso"], points: 10 },
                        { type: "single", content: "¿Cuál es el resultado de 10 / 2?", answers: ["3", "4", "5", "6"], correctAnswers: ["5"], points: 10 },
                        { type: "multiple", content: "¿Cuáles de las siguientes operaciones son correctas?", answers: ["3 + 2 = 6", "4 * 2 = 8", "5 - 3 = 1"], correctAnswers: ["4 * 2 = 8", "5 - 3 = 2"], points: 10 },
                        { type: "all", content: "¿Cuáles de las siguientes operaciones son incorrectas?", answers: ["2 * 2 = 4", "6 / 3 = 2", "7 - 4 = 3"], correctAnswers: ["2 * 2 = 4", "7 - 4 = 3"], points: 10 }
                    ]  },
                    { title: "Fracciones y Decimales", threshold: 60, questions: [
                        { type: "boolean", content: "¿La fracción 1/2 es mayor que 1/3?", answers: ["Verdadero", "Falso"], correctAnswers: ["Verdadero"], points: 10 },
                        { type: "single", content: "¿Cuál es el resultado de 1/4 + 1/4?", answers: ["1/2", "1/4", "2/4", "3/4"], correctAnswers: ["1/2"], points: 10 },
                        { type: "multiple", content: "¿Cuáles de las siguientes fracciones son equivalentes a 1/2?", answers: ["2/4", "3/6", "4/8", "5/10"], correctAnswers: ["2/4", "4/8"], points: 10 },
                        { type: "all", content: "¿Cuáles de las siguientes fracciones son menores que 1/3?", answers: ["1/2", "1/3", "1/4", "2/5"], correctAnswers: ["1/4", "2/5"], points: 10 }
                    ]  }
                ]
            },
            {
                title: "Viaje por la Historia de México: Desde los Aztecas hasta la Independencia",
                lessons: [
                    { title: "Los Primeros Habitantes y los Aztecas", threshold: 70, questions: [
                        { type: "boolean", content: "¿Los aztecas fundaron la ciudad de Tenochtitlán en una isla?", answers: ["Verdadero", "Falso"], correctAnswers: ["Verdadero"], points: 10 },
                        { type: "single", content: "¿Cuál era la principal actividad económica de los aztecas?", answers: ["Agricultura", "Caza", "Pesca", "Comercio"], correctAnswers: ["Agricultura"], points: 10 },
                        { type: "multiple", content: "¿Cuáles de las siguientes deidades eran importantes en la religión azteca?", answers: ["Huitzilopochtli", "Quetzalcóatl", "Tláloc", "Odín"], correctAnswers: ["Huitzilopochtli", "Quetzalcóatl", "Tláloc"], points: 10 },
                        { type: "all", content: "¿Cuáles de las siguientes ciudades son anteriores a Tenochtitlán?", answers: ["Texcoco", "Tula", "Tlacopan", "Veracruz"], correctAnswers: ["Texcoco", "Tula"], points: 10 }
                    ] },
                    { title: "La Conquista y la Colonia", threshold: 80, questions: [
                        { type: "boolean", content: "¿La caída de Tenochtitlán marcó el fin del imperio azteca?", answers: ["Verdadero", "Falso"], correctAnswers: ["Verdadero"], points: 10 },
                        { type: "single", content: "¿Qué actividad económica fue la más importante durante la Colonia en Nueva España?", answers: ["Minería", "Agricultura", "Comercio", "Pesca"], correctAnswers: ["Minería"], points: 10 },
                        { type: "multiple", content: "¿Cuáles de las siguientes instituciones fueron creadas por los españoles durante la Colonia?", answers: ["Encomienda", "Mita", "Hacienda", "Ejido"], correctAnswers: ["Encomienda", "Mita", "Hacienda"], points: 10 },
                        { type: "all", content: "¿Cuáles de los siguientes productos fueron introducidos en América por los españoles?", answers: ["Trigo", "Maíz", "Café", "Vino"], correctAnswers: ["Trigo", "Café", "Vino"], points: 10 }
                    ] },
                    { title: "El Camino hacia la Independencia", threshold: 75, questions: [
                        { type: "boolean", content: "¿El Grito de Dolores se llevó a cabo en 1810?", answers: ["Verdadero", "Falso"], correctAnswers: ["Verdadero"], points: 10 },
                        { type: "single", content: "¿Quién es conocido como el 'Padre de la Patria'?", answers: ["Miguel Hidalgo", "José María Morelos", "Ignacio Allende", "Vicente Guerrero"], correctAnswers: ["Miguel Hidalgo"], points: 10 },
                        { type: "multiple", content: "¿Cuáles de los siguientes eventos ocurrieron durante el proceso de independencia?", answers: ["Conspiración de Valladolid", "Abrazo de Acatempan", "Sitio de Cuautla", "Batalla de Puebla"], correctAnswers: ["Conspiración de Valladolid", "Abrazo de Acatempan", "Sitio de Cuautla"], points: 10 },
                        { type: "all", content: "¿Cuáles de las siguientes figuras fueron líderes importantes en la lucha por la independencia?", answers: ["Mariano Matamoros", "Leona Vicario", "Manuel Mier y Terán", "Miguel Barragán"], correctAnswers: ["Mariano Matamoros", "Leona Vicario", "Manuel Mier y Terán"], points: 10 }
                    ] }
                ]
            },
            {
                title: "Maravillas del Mundo Natural: Descubriendo Plantas y Animales de Nuestro Entorno",
                lessons: [
                    { title: "Introducción a la Biodiversidad", threshold: 80, questions: [
                        { type: "boolean", content: "La biodiversidad se refiere a la variedad de vida en la Tierra.", answers: ["Verdadero", "Falso"], correctAnswers: ["Verdadero"], points: 10 },
                        { type: "single", content: "¿Cuál de los siguientes es un tipo de biodiversidad?", answers: ["Diversidad de especies", "Diversidad de juguetes", "Diversidad de colores"], correctAnswers: ["Diversidad de especies"], points: 10 },
                        { type: "multiple", content: "¿Cuáles de los siguientes factores amenazan la biodiversidad?", answers: ["Deforestación", "Contaminación del agua", "Uso sostenible de recursos"], correctAnswers: ["Deforestación", "Contaminación del agua"], points: 10 },
                        { type: "all", content: "¿Cuáles de los siguientes ejemplos representan la biodiversidad?", answers: ["Un bosque con árboles, plantas y animales", "Un jardín solo con rosas", "Un río contaminado"], correctAnswers: ["Un bosque con árboles, plantas y animales"], points: 10 }
                    ] },
                    { title: "Plantas: Nuestros Productores Naturales", threshold: 70, questions: [
                        { type: "boolean", content: "Las plantas realizan la fotosíntesis para obtener energía.", answers: ["Verdadero", "Falso"], correctAnswers: ["Verdadero"], points: 10 },
                        { type: "single", content: "¿Cuál es la principal función de las raíces de una planta?", answers: ["Absorber agua y nutrientes del suelo", "Realizar la fotosíntesis", "Producir flores"], correctAnswers: ["Absorber agua y nutrientes del suelo"], points: 10 },
                        { type: "multiple", content: "¿Cuáles de las siguientes son partes de una planta?", answers: ["Hoja", "Rama", "Fruta", "Pata"], correctAnswers: ["Hoja", "Rama", "Fruta"], points: 10 },
                        { type: "all", content: "¿Cuáles de las siguientes plantas son consideradas árboles?", answers: ["Pino", "Rosa", "Cactus", "Manzano"], correctAnswers: ["Pino", "Manzano"], points: 10 }
                    ] },
                    { title: "Animales: Nuestros Vecinos Naturales", threshold: 60, questions: [
                        { type: "boolean", content: "Los mamíferos son animales vertebrados que tienen pelo y producen leche para alimentar a sus crías.", answers: ["Verdadero", "Falso"], correctAnswers: ["Verdadero"], points: 10 },
                        { type: "single", content: "¿Cuál de los siguientes animales es un reptil?", answers: ["Tortuga", "Ballena", "Águila", "Rana"], correctAnswers: ["Tortuga"], points: 10 },
                        { type: "multiple", content: "¿Cuáles de los siguientes animales son considerados vertebrados?", answers: ["Pez", "Abeja", "Serpiente", "Caracol"], correctAnswers: ["Pez", "Serpiente"], points: 10 },
                        { type: "all", content: "¿Cuáles de los siguientes animales son considerados insectos?", answers: ["Mariposa", "Araña", "Hormiga", "Escarabajo"], correctAnswers: ["Mariposa", "Hormiga", "Escarabajo"], points: 10 }
                    ] }
                ]
            }
        ];

        for (let course of courses) {
            let createdCourse = await CourseServices.store(course.title);
            console.log(`Created course: ${createdCourse.title}`);

            for (let lesson of course.lessons) {
                let createdLesson = await LessonServices.store(lesson.title, lesson.threshold);
                await CourseServices.pushLessonId(createdLesson.id, createdCourse.id);
                console.log(`Created lesson: ${createdLesson.title}`);

                for (let question of lesson.questions) {
                    let createdQuestion = await QuestionServices.store(question.type, question.content, question.answers, question.correctAnswers, question.points);
                    await LessonServices.pushQuestionId(createdQuestion.id, createdLesson.id);
                    console.log(`Created question: ${question.content}`);
                }
            }
        }

        console.log("All courses, lessons, and questions have been created successfully.");
        return true;
    } catch (error) {
        console.error('Error creating courses:', error);
    }
};

const generateData = async (request, response) => {
    try {
        await createCourses().then(() => {
            response.json({ message: "Process completed."});
        }).catch((error) => {
            console.error("Error:", error);
            response.json({ message: "Process incompleted."});
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al generar la información de los cursos, lecciones y preguntas." })
    }
};

const responseJsonFormat = async (user) => {
    return {
        id: user._id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
    }
};

export default {
    store,
    update,
    get,
    index,
    destroy,
    generateData,
};