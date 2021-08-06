export const roles = [
    {code: 0, role_name: "admin"},
    {code: 1, role_name: "super"},
    {code: 2, role_name: "normal"},
];

export const escalaJerarquica = [
    {
        "id_escala_jerarquica": 1,
        "escala_jerarquica": "oficial"
    },
    {
        "id_escala_jerarquica": 2,
        "escala_jerarquica": "suboficial"
    }
];

export const escalafon = [
    {
        "id_escalafon": 1,
        "escalafon": "Penitenciario"
    },
    {
        "id_escalafon": 2,
        "escalafon": "Profesional y Técnico"
    }
];

export const jerarquia = [
    {
        "id_jerarquia": 5,
        "jerarquia": "oficial jefe"
    },
    {
        "id_jerarquia": 3,
        "jerarquia": "oficial subalterno"
    },
    {
        "id_jerarquia": 4,
        "jerarquia": "oficial superior"
    },
    {
        "id_jerarquia": 1,
        "jerarquia": "suboficial subalterno"
    },
    {
        "id_jerarquia": 2,
        "jerarquia": "suboficial superior"
    },
    {
        "id_jerarquia": 6,
        "jerarquia": "tropa"
    }
];

export const grados = [
    {
        "id_grado": 1,
        "grado": "agente",
        "escala_jerarquica_id": 2,
        "jerarquia_id": 6
    },
    {
        "id_grado": 2,
        "grado": "cabo",
        "escala_jerarquica_id": 2,
        "jerarquia_id": 1
    },
    {
        "id_grado": 3,
        "grado": "cabo 1º",
        "escala_jerarquica_id": 2,
        "jerarquia_id": 1
    },
    {
        "id_grado": 4,
        "grado": "sargento",
        "escala_jerarquica_id": 2,
        "jerarquia_id": 1
    },
    {
        "id_grado": 5,
        "grado": "Prefecto Mayor",
        "escala_jerarquica_id": 1,
        "jerarquia_id": 4
    },
    {
        "id_grado": 6,
        "grado": "Prefecto",
        "escala_jerarquica_id": 1,
        "jerarquia_id": 4
    },
    {
        "id_grado": 7,
        "grado": "Subprefecto",
        "escala_jerarquica_id": 1,
        "jerarquia_id": 4
    },
    {
        "id_grado": 8,
        "grado": "Alcaide Mayor",
        "escala_jerarquica_id": 1,
        "jerarquia_id": 5
    },
    {
        "id_grado": 9,
        "grado": "Alcaide",
        "escala_jerarquica_id": 1,
        "jerarquia_id": 5
    },
    {
        "id_grado": 10,
        "grado": "Subalcaide",
        "escala_jerarquica_id": 1,
        "jerarquia_id": 5
    },
    {
        "id_grado": 11,
        "grado": "Adjutor Mayor",
        "escala_jerarquica_id": 1,
        "jerarquia_id": 3
    },
    {
        "id_grado": 12,
        "grado": "Adjutor",
        "escala_jerarquica_id": 1,
        "jerarquia_id": 3
    },
    {
        "id_grado": 13,
        "grado": "Subadjutor",
        "escala_jerarquica_id": 1,
        "jerarquia_id": 3
    },
    {
        "id_grado": 14,
        "grado": "Suboficial Mayor",
        "escala_jerarquica_id": 2,
        "jerarquia_id": 2
    },
    {
        "id_grado": 15,
        "grado": "Suboficial Principal",
        "escala_jerarquica_id": 2,
        "jerarquia_id": 2
    },
    {
        "id_grado": 16,
        "grado": "Sargento Ayudante",
        "escala_jerarquica_id": 2,
        "jerarquia_id": 2
    },
    {
        "id_grado": 17,
        "grado": "Sargento Primero",
        "escala_jerarquica_id": 2,
        "jerarquia_id": 2
    }
];

export const nivelEducativo = [
    {
        "id_nivel_educativo": 2,
        "nivel_educativo": "primaria completa"
    },
    {
        "id_nivel_educativo": 1,
        "nivel_educativo": "primaria incompleta"
    },
    {
        "id_nivel_educativo": 4,
        "nivel_educativo": "secundaria completa"
    },
    {
        "id_nivel_educativo": 3,
        "nivel_educativo": "secundaria incompleta"
    },
    {
        "id_nivel_educativo": 6,
        "nivel_educativo": "terciario completo"
    },
    {
        "id_nivel_educativo": 5,
        "nivel_educativo": "terciario incompleto"
    },
    {
        "id_nivel_educativo": 8,
        "nivel_educativo": "universitario completo"
    },
    {
        "id_nivel_educativo": 7,
        "nivel_educativo": "universitario incompleto"
    }
];

export const provincias = [
        {
            "id_provincia": 1,
            "provincia": "CAPITAL FEDERAL"
           
        },
        {
            "id_provincia": 2,
            "provincia": "BUENOS AIRES"
           
        },
        {
            "id_provincia": 3,
            "provincia": "CATAMARCA",
           
        },
        {
            "id_provincia": 4,
            "provincia": "CORDOBA",
           
        },
        {
            "id_provincia": 5,
            "provincia": "CORRIENTES",
            
        },
        {
            "id_provincia": 6,
            "provincia": "CHACO",
            
        },
        {
            "id_provincia": 7,
            "provincia": "CHUBUT",
           
        },
        {
            "id_provincia": 8,
            "provincia": "ENTRE RIOS",
           
        },
        {
            "id_provincia": 9,
            "provincia": "FORMOSA",
           
        },
        {
            "id_provincia": 10,
            "provincia": "JUJUY"
           
        },
        {
            "id_provincia": 11,
            "provincia": "LA PAMPA"
            
        },
        {
            "id_provincia": 12,
            "provincia": "LA RIOJA",
           
        },
        {
            "id_provincia": 13,
            "provincia": "MENDOZA"
            
        },
        {
            "id_provincia": 14,
            "provincia": "MISIONES"
            
        },
        {
            "id_provincia": 15,
            "provincia": "NEUQUEN"
            
        },
        {
            "id_provincia": 16,
            "provincia": "RIO NEGRO"
        },
        {
            "id_provincia": 17,
            "provincia": "SALTA"
        },
        {
            "id_provincia": 18,
            "provincia": "SAN JUAN"
        },
        {
            "id_provincia": 19,
            "provincia": "SAN LUIS"
        },
        {
            "id_provincia": 20,
            "provincia": "SANTA CRUZ"
        },
        {
            "id_provincia": 21,
            "provincia": "SANTA FE"
        },
        {
            "id_provincia": 22,
            "provincia": "SANTIAGO DEL ESTERO"
        },
        {
            "id_provincia": 23,
            "provincia": "TIERRA DEL FUEGO"
        },
        {
            "id_provincia": 24,
            "provincia": "TUCUMAN"
        }
];



export const sexos = [
    {
        "id_sexo": 2,
        "sexo": "femenino"
    },
    {
        "id_sexo": 1,
        "sexo": "masculino"
    }
];

export const destinos = [
    {
        "id_destino": 9,
        "destino": "Dirección General"
    },
    {
        "id_destino": 8,
        "destino": "sin destino"
    },
    {
        "id_destino": 1,
        "destino": "Unidad Carcelaria Nº 1 - Salta"
    },
    {
        "id_destino": 2,
        "destino": "Unidad Carcelaria Nº 2 - Metán"
    },
    {
        "id_destino": 3,
        "destino": "Unidad Carcelaria Nº 3 - Orán"
    },
    {
        "id_destino": 4,
        "destino": "Unidad Carcelaria Nº 4 - Mujeres Salta"
    },
    {
        "id_destino": 5,
        "destino": "Unidad Carcelaria Nº 5 - Tartagal"
    },
    {
        "id_destino": 6,
        "destino": "Unidad Carcelaria Nº 6 - Granja Rosario de Lerma"
    },
    {
        "id_destino": 7,
        "destino": "Unidad Carcelaria Nº 7 - Granja Cerrillos"
    }
];

export const situacion = [
    {
        "id_situacion": 1,
        "situacion": "Activo"
    },
    {
        "id_situacion": 2,
        "situacion": "Pasivo"
    }
];

export const departamentos = [
    {
        "id_departamento": 1,
        "departamento": "Vigilancia y Tratamiento",
        "destino_id": 1
    },
    {
        "id_departamento": 2,
        "departamento": "Seguridad Externa",
        "destino_id": 1
    },
    {
        "id_departamento": 3,
        "departamento": "sin departamento",
        "destino_id": 0
    },
    {
        "id_departamento": 4,
        "departamento": "Perimetral",
        "destino_id": 5
    },
    {
        "id_departamento": 5,
        "departamento": "Seguridad Interna",
        "destino_id": 5
    },
    {
        "id_departamento": 6,
        "departamento": "Secretaría General",
        "destino_id": 9
    },
    {
        "id_departamento": 10,
        "departamento": "Sanidad",
        "destino_id": 9
    }
];

export const divisiones = [
    {
        "id_division": 1,
        "division": "Lavadero Penal",
        "departamento_id": 1
    },
    {
        "id_division": 2,
        "division": "Sumarios",
        "departamento_id": 1
    },
    {
        "id_division": 3,
        "division": "Registro y Requisa",
        "departamento_id": 2
    },
    {
        "id_division": 4,
        "division": "Control de Prohibiciones",
        "departamento_id": 2
    },
    {
        "id_division": 5,
        "division": "sin destino",
        "departamento_id": 0
    },
    {
        "id_division": 6,
        "division": "Procesamiento de Datos",
        "departamento_id": 6
    },
    {
        "id_division": 7,
        "division": "Ceremonial y Prensa",
        "departamento_id": 6
    },
    {
        "id_division": 8,
        "division": "Comunicaciones",
        "departamento_id": 6
    },
    {
        "id_division": 9,
        "division": "Mesa de Entrada y Archivo General",
        "departamento_id": 6
    }
];

export const sectores = [
        {
            "id_sector": 1,
            "sector": "sin sector",
            "division_id": 0
        },
        {
            "id_sector": 2,
            "sector": "Programación",
            "division_id": 6
        },
        {
            "id_sector": 3,
            "sector": "Técnica",
            "division_id": 6
        }
    
];

export const secciones_guardia = [
    {
        "id_seccion": 1,
        "seccion": "sin seccion de guardia",
        "departamento_id": 0
    },
    {
        "id_seccion": 2,
        "seccion": "Primera Sección - Interna",
        "departamento_id": 1
    },
    {
        "id_seccion": 3,
        "seccion": "Segunda Sección - Interna",
        "departamento_id": 1
    },
    {
        "id_seccion": 4,
        "seccion": "Tercera Sección - Interna",
        "departamento_id": 1
    },
    {
        "id_seccion": 5,
        "seccion": "Cuarta Sección - Interna",
        "departamento_id": 1
    },
    {
        "id_seccion": 6,
        "seccion": "Primera Sección - Externa",
        "departamento_id": 2
    },
    {
        "id_seccion": 7,
        "seccion": "Segunda Sección - Externa",
        "departamento_id": 2
    },
    {
        "id_seccion": 8,
        "seccion": "Tercera Sección - Externa",
        "departamento_id": 2
    },
    {
        "id_seccion": 9,
        "seccion": "Cuarta Sección - Externa",
        "departamento_id": 2
    }
];


export const estados_civil = [
    {
        "id_estado_civil": 1,
        "estado_civil": "casado"
    },
    {
        "id_estado_civil": 3,
        "estado_civil": "divorciado"
    },
    {
        "id_estado_civil": 2,
        "estado_civil": "soltero"
    },
    {
        "id_estado_civil": 4,
        "estado_civil": "viudo"
    }
];

