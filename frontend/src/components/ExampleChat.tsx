const MensajePrueba = ([
    {
      role: "assistant",
      content: `
👋 Hola, soy tu **asistente histórico RAG**.  
Puedo ayudarte a explorar *documentos coloniales*, identificar personajes o analizar eventos antiguos.  

¿Sobre qué tema te gustaría conversar hoy?
`,
      sources: [],
    },
    {
      role: "user",
      content:
        "Estoy investigando sobre el Ayllu Tinta a inicios del siglo XIX, ¿quién era su cacique en 1806?",
      sources: [],
    },
    {
      role: "assistant",
      content: `
### 🧭 Informe histórico: Cacique del Ayllu Tinta (1806)

Según los registros del **expediente Nº 49**, fechado en **agosto de 1806**, el **cacique principal del Ayllu Tinta** era **Don Andrés Chuquitapa**.

---

#### 🧩 Interpretación
El documento confirma su autoridad y muestra conflictos locales entre caciques y tributarios, algo común tras las **reformas borbónicas**.
`,
      sources: [
        {
          title: "Página 1 - Inicio del expediente",
          url: "expediente_49#1",
          snippet:
            "Expediente seguido por el indio Manuel Mancachoque sobre los maltratos recibidos del cacique del Ayllu Tinta D. Andrés Chuquitapa...",
          content: `
              Agosto 26 de 1806 

              Expediente seguido por el indio Manuel
              Mancachoque sobre los maltratos y tropelías que
              le ha inferido el cacique del Ayllu Tinta D.
              Andrés Chuquitapa; y se le borre de la
              matrícula en que lo han numerado en clase de
              tributarios. \n
              Instancia 
              Real Hacienda
                  `,
          highlight: "cacique del Ayllu Tinta D. Andrés Chuquitapa",
        },
      ],
    },
    {
      role: "user",
      content:
        "¿Y qué tipo de abusos se mencionan contra este cacique en el expediente?",
      sources: [],
    },
    {
      role: "assistant",
      content: `
### ⚖️ Denuncias registradas contra el cacique Andrés Chuquitapa

El expediente describe varios **abusos y excesos de autoridad** cometidos por el cacique contra los tributarios del Ayllu Tinta.

---

#### 📌 Principales denuncias
1. **Apropiación de tierras:** se acusa al cacique de quitar chacras y redistribuirlas entre sus allegados.  
2. **Trabajo forzoso:** obligaba a los indios a realizar faenas sin pago ni permiso.  
3. **Violencia física y castigos:** algunos testigos afirman haber presenciado maltratos personales.

---

Estas acusaciones reflejan tensiones típicas de la transición entre el sistema de **repartimientos coloniales** y las **reformas republicanas posteriores**.  
El expediente es un testimonio valioso del **abuso de poder local** y la **resistencia indígena**.
`,
      sources: [
        {
          title: "Página 3 - Declaración del sargento Isidro Cano",
          url: "expediente_49#3",
          snippet:
            "A los indios perjudica quitando sus chacras o tierras y los arrea con faenas...",
          content: `              Declaración del sargento Isidro Cano
              \n
              A los indios perjudica quitando sus chacras o tierras y
              los arrea con faenas, sin darles permiso ni paga alguna.
              \n
              `,
          highlight: "quitando sus chacras o tierras y los arrea con faenas",
        },
      ],
    },
  ]);