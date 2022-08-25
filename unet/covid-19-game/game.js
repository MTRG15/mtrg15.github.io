const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(4)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  { // 00 Inicio
    id: 0,
    text: 'Malindranio despierta un día regular en su habitación, es día de escuela y debe prepararse.\n\nMientras se viste y prepara su mochila, Malindranio escucha la radio de la cocina\n\n \"...Se han reportado una oleada de casos de COVID en la zona metropolitana de San Cristóbal, las autoridades evalúan la posibilidad de una cuarentena radical...\"\n\nMalindranio escucha a su papá llamándolo\n\n \"Mijo apúrese que vamos tarde para la escuela\"\n\nSólo hay tiempo de empacar una cosa más en la mochila',
    options: [ 
      { 
        text: 'Tapabocas',
        setState: { tapabocas: true }, 
        nextText: 1
      },
      { 
        text: 'Gel antibacterial', 
        nextText: 1.1
      },
      { 
        text: 'Guantes desechables', 
        nextText: 1.1
      },
      { 
        text: 'Un fidget spinner', 
        nextText: 1.1
      }
    ]
  },
  { // 00 Inicio - Escenario B
    id: 0.1,
    text: 'Malindranio entra en su habitación con apuro.\n\nPuede escuchar desde la sala a su papá diciendo: \n\n\"Cuento tres y llevo dos o me voy solo!\"\n\nSólo hay tiempo de empacar una cosa más en la mochila',
    options: [ 
      { 
        text: 'Tapabocas',
        setState: { tapabocas: true }, 
        nextText: 1
      },
      { 
        text: 'Gel antibacterial', 
        nextText: 1.2
      },
      { 
        text: 'Guantes desechables', 
        nextText: 1.2
      },
      { 
        text: 'Un fidget spinner', 
        nextText: 1.2
      }
    ]
  },
  { // 01 Saliendo a la Escuela
    id: 1,
    text: 'Malindranio entra en la sala y ve a su papá que le dice:\n\n\"¡Vamoj vamoj Mijo apúerese! ¿Ya tiene todo listo?... Bueno, póngase bien el tapabocas y móntese en el carro, tome la plata para el desayuno\"',
    options: [
      {
        text: 'Ir al estacionamiento',
        nextText: 2
      }
    ]
  },
  { // 01 Saliendo a la Escuela - Escenario B
    id: 1.1,
    text: 'Malindranio entra en la sala y ve a su papá que le dice:\n\n\"¡Vamoj vamoj Mijo apúerese! ¿Ya tiene todo listo? ¿Dónde está su tapabocas? Mire Mijo, se me regresa y busca el tapabocas rapidito\"',
    options: [
      {
        text: 'Regresar a al cuarto',
        nextText: 0.1
      }
    ]
  },
  { // 01 Saliendo a la Escuela - Escenario B2
    id: 1.2,
    text: 'Malindranio entra en la sala y ve a su papá que le dice:\n\n\"¿otra vej? ¿Dónde está el tapabocas? ¡Se me devuelve, y deje de hacerse el gracioso!\"',
    options: [
      {
        text: 'Regresar a al cuarto',
        nextText: 0.1
      }
    ]
  },
  { // 02 - Llegando a la Escuela
    id: 2,
    text: 'Malindranio llega a la escuela, se despide de su papá y saluda a sus amigos, Filiberta y Feodoro\n\nFiliberta: \"¿Hiciste la tarea de castellano? Yo apenas pude terminarla anoche\"\n\nFeodoro: \"Epale, ¿Vió el partido del Barça ayer? Uy estuvo buenísimo ese penalti\"\n\nFiliberta: \"Ay no ya van a empezar a hablar de fútbol, vamos a clase mejor\"',
    options: [
      {
        text: 'Ir a clase',
        nextText: 3
      }
    ]
  },
  { // 03 - En el Recreo
    id: 3,
    text: 'El día transcurre sin novedad. A la hora del recreo Malindranio y sus amigos salen al patio de la escuela y observan a otros estudiantes abarrotados intentado pedir primero.\n\nFeodoro: \"Uy chamo tengo hambre, ¿Qué compramos pal desayuno?\".\n\nFiliberta: \"El menú dice que hay tequeños, hamburguesas y pastelitos de pollo..."\n\nFeodoro: \"Vamos a pedir una de cada cosa para probar todo\"',
    options: [
      {
        text: 'Ver la comida en las vitrinas antes de pedir',
        nextText: 3.1
      },
      {
        text: 'Dejar que Filiberta y Feodoro pidan primero, a Malindranio le da igual',
        nextText: 3.13
      }
    ]
  },
  { // 03 - En el Recreo - Escenario A
    id: 3.1,
    text: 'Malindranio observa mientras sus amigos intentan pedir entre la gente, los vendedores llenan las vitrinas\n\nFeodoro y Filiberta discuten quién va a pedir qué cosa\n\nMalindranio observa en la parte de atrás como uno de los cocineros lleva el tapabocas mal puesto... lo lleva en el cuello como un collar, mientras carga una bandeja hacia la vitrina...\n\n... la bandeja es de tequeños\n\nFiliberta: \"Ay esos tequeños se ven buenos, yo me voy a comprar 2\"\n\nFeodoro: \"Yo me voy a comer una hamburguesa entonces, Malindranio compra pasteles\"\n\nFiliberta: \"¡Si si si! Me parece bien\"',
    options: [
      {
        text: 'Decirle a sus amigos lo que vió Malindranio respecto al cocinero',
        nextText: 3.12
      },
      {
        text: 'Ignorar lo que sucedió y comprar pastelitos',
        nextText: 3.13
      }
    ]
  },
  { // 03 - En el Recreo - Escenario A2
    id: 3.12,
    text: 'Filiberta: \"¡Uyyyyyyy fuchiiiiiiii que cochina esta cantina!\"\n\nFeodoro: \"Y quien sabe qué otra cosa habrá estorunidado el viejo ese\"\n\nFiliberta: \"Ay no pero yo tengo hambre, vamos a pedir hamburguesas y pasteles y que sea lo que Dios quiera\"',
    options: [
      {
        text: 'Comprar hamburguesas',
        nextText: 3.3
      },
      {
        text: 'Comprar pasteles de pollo',
        nextText: 3.3
      }
    ]
  },
  { // 03 - En el Recreo - Escenario A3
    id: 3.13,
    text: '\n\nFiliberta: \"Ay esos tequeños se ven buenos, yo me voy a comprar 2\"\n\nFeodoro: \"Yo me voy a comer una hamburguesa entonces, Malindranio compra pasteles\"\n\nFiliberta: \"¡Si si si! Me parece bien\"\n\nFeodoro: \"¡Malindranio! ¿Qué va a pedir?\"',
    options: [
      {
        text: 'Comprar hamburguesas',
        setState: {filibertaCovid: true, feodoroCovid: true},
        nextText: 3.3
      },
      {
        text: 'Comprar pasteles de pollo',
        setState: {filibertaCovid: true, feodoroCovid: true},
        nextText: 3.3
      }
    ]
  },
  { // 03 - En el Recreo - Escenario B
    id: 3.2,
    text: 'A Malindranio le enseñaron a no criticar la comida en su casa, \"Yo como lo que me den\" - piensa mientras comparte su desayuno con sus amigos',
    options: [
      {
        text: 'Comprar pasteles de pollo y compartir con los demás',
        setState: {filibertaCovid: true, feodoroCovid: true},
        nextText: 3.3
      }
    ]
  },
  { // 03 - En el Recreo - Escenario C
    id: 3.3,
    text: 'Después de ponerse de acuerdo y comprar, el recreo transcurre normal, Malindranio se sienta a hablar con sus amigos mientras miran a otros estudiantes jugar a la pelota.\n\nUno de los niños, intentando impresionar a los demás, salta para atrapar la pelota con el pecho, pero calcula mal su salto y recibe un pelotazo en la cara... Ron se atraganta un poco mientras ríe viendo lo sucedido',
    options: [
      {
        text: 'Volver a clase',
        nextText: 4
      }
    ]
  },
  { // 04 - Evacuación
    id: 4,
    text: 'Más tarde ese día, Malindranio está en clase de castellano cuando llega un profesor e interrumpe bruscamente diciendo:\n\nProfesor: \"Buenos días, profe, la dirección informa que por favor salga el salón a la cancha para un evento\"\n\nEl profesor de castellano se queja un poco por la interrupción, pero luego de hablar en privado, pide al salón guardar y salir ordenadamente a la cancha',
    options: [
      {
        text: 'Guardar e ir a la cancha',
        nextText: 4.1
      }
    ]
  },
  { // 04 - Evacuación - Escenario A
    id: 4.1,
    text: 'Una vez en la cancha, Malindranio nota que son el único salón en la cancha...\n\nTodos se sientan ordenadamente en la cancha, formando filas como de costumbre.\n\nEl silencio crea un ambiente de nervios entre los estudiantes...\n\nMalindranio apenas puede escuchar a dos estudiantes detrás de él hablando sobre por qué los mandaron a salir...\n\nEl profesor de castellano recibe una llamada en su teléfono e intenta apartarse a una esquina para que no lo escuchen.\n\nEs difícil prestarle atención a ambos al mismo tiempo... Malindranio debe elegir a quien escuchar',
    options: [
      {
        text: 'Escuchar el chisme de los estudiantes',
        nextText: 4.2
      },
      {
        text: 'Escuchar el chisme del profesor',
        nextText: 4.3
      }
    ]
  },
  { // 04 - Evacuación - Escenario B
    id: 4.2,
    text: 'Malindranio se inclina hacia atrás para acercarse y escuchar mejor, es difícil entender entre los susurros de los demás, pero puede escuchar:\n\n\"... yo iba saliendo del salón y vi una ambulancia llegando por detrás de la escuela...\"\n\n\"... no pero iban vestidos de amarillo, como con un casco que parecían aliens...\"\n\n\"... nah nah usted es muy exagerada chama no le creo...\"\n\n\"... no chama, parecía una película, se lo juro, ¡Me asusté toda!...\"\n\nDe repente Malindranio le golpea una pelota de papel en la cabeza y escucha \"¡Cuidado y se le quema el arroz!\" seguido de risas...',
    options: [
      {
        text: 'Continuar',
        nextText: 4.4
      }
    ]
  },
  { // 04 - Evacuación - Escenario C
    id: 4.3,
    text: 'Malindranio se inclina hacia adelante -"vamos chismógrafo, no me falles"- piensa mientras se concentra para escuchar al profesor por encima de los murmullos. Puede entender que dice:\n\n\"... si si salieron todos, pero estamos solos, están nerviosos...\"\n\n"... pero el niño no vino a clase hoy, ayer se veía normal...\"\n\n\"... y qué le dijeron de las medidas? Mire usted sabe que yo soy asmático...\"',
    options: [
      {
        text: 'Continuar',
        nextText: 4.4
      }
    ]
  },
  { // 04 - Evacuación - Escenario D
    id: 4.4,
    text: 'Mientras malindranio intenta escuchar, se escuchan más y más pasos en el interior de la escuela, el ruido se vuelve más fuerte que los susurros en la cancha.\n\nEl portero llega corriendo, murmulla algo al profesor y abre el portón de salida. El profesor dice:\n\n\"Hoy vamos a salir temprano por una emergencia. Ya les avisaron a sus representantes que los vengan a buscar muchachos, por favor no se levanten hasta que yo los llame\"\n\nLos murmullos continúan mientras esperan',
    options: [
      {
        text: 'Esperar a que vengan a buscar a Malindranio',
        nextText: 5
      }
    ]
  },
]

startGame()