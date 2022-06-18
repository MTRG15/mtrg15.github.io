const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(0)
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
]

startGame()