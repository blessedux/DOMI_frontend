# DOMI - AI-Powered Municipal Works Permit Management

![DOMI Logo](./public/icons/logo/domi_logo.svg)

DOMI es una aplicación impulsada por IA que facilita y optimiza la gestión de permisos municipales, reduciendo tiempos y errores para arquitectos y profesionales que gestionan obras municipales en Chile.

## Estado del Proyecto

Este repositorio contiene el **frontend** de la aplicación DOMI. Actualmente, el proyecto está en fase de desarrollo con las siguientes características:

- ✅ Interfaz de usuario completa con flujo de navegación
- ✅ Sistema de autenticación simulado
- ✅ Paneles específicos para diferentes roles de usuario
- ✅ Gestión de observaciones en solicitudes
- ⏳ Integración con backend en desarrollo
- ⏳ Funcionalidades de IA en implementación

## Características principales

### Implementadas

- 📑 **Gestión de documentos**: Cargue, organice y gestione todos sus documentos en un solo lugar.
- 🔍 **Seguimiento de aprobaciones**: Monitoree el estado de sus solicitudes en tiempo real a través del panel de control.
- 📝 **Gestión de observaciones**: Visualización y resolución de observaciones realizadas por los revisores.
- 👤 **Roles de usuario**: Soporte para diferentes tipos de usuarios (Solicitante, Revisor, Funcionario DOM).

### En desarrollo

- 🤖 **Detección de infracciones con IA**: Análisis automático de documentos para detectar posibles infracciones antes de la presentación.
- 📄 **Acta de observaciones automatizada**: Generación de documentos oficiales basados en las observaciones realizadas.
- 🔎 **Análisis de planos con IA**: Segmentación y extracción de información relevante de planos arquitectónicos.

## Tecnologías utilizadas

- **Next.js**: Framework de React para aplicaciones web
- **TypeScript**: Lenguaje de programación tipado
- **Tailwind CSS**: Framework CSS para diseño responsive
- **Shadcn UI**: Componentes de interfaz de usuario
- **AI/ML**: Integración de modelos de aprendizaje automático (en desarrollo)

## Arquitectura de IA

El sistema de IA de DOMI utiliza varias técnicas avanzadas para procesar y analizar documentos técnicos:

### Segmentación de planos (U-Net)

Utilizamos una arquitectura de red neuronal U-Net para la segmentación de elementos en planos arquitectónicos, lo que permite:

- Identificar y extraer elementos específicos de los planos
- Clasificar diferentes componentes mediante un código de colores
- Procesar información visual compleja para su posterior análisis

### Análisis automatizado

El sistema permite realizar análisis automáticos de documentos para:

- Detectar posibles infracciones normativas
- Verificar cumplimiento de requisitos técnicos
- Generar observaciones preliminares para revisión

## Instalación y uso

### Requisitos previos

- Node.js 18 o superior
- npm o yarn

### Instalación

1. Clone el repositorio:

   ```bash
   git clone https://github.com/tuorganizacion/DOMI_frontend.git
   cd DOMI_frontend
   ```

2. Instale las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Ejecute el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) en su navegador para ver la aplicación.

### Acceso a la aplicación

La aplicación cuenta con un sistema de autenticación simulado que permite acceder con diferentes roles:

- **Solicitante**: Acceso a solicitudes propias y gestión de observaciones
- **Revisor**: Revisión de solicitudes y creación de observaciones
- **Funcionario DOM**: Aprobación final y gestión administrativa

## Próximos pasos

1. **Integración con backend**: Conectar con API para persistencia de datos
2. **Implementación de IA**: Integración completa de modelos de segmentación y análisis
3. **Generación de documentos**: Automatización de actas y documentación oficial
4. **Flujo completo de aprobación**: Implementación del ciclo completo de gestión de permisos

## Contribuir

Si desea contribuir al proyecto, por favor:

1. Haga un fork del repositorio
2. Cree una rama para su feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haga commit de sus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Cree un nuevo Pull Request

## Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).

---

Desarrollado con ❤️ por el equipo DOMI
