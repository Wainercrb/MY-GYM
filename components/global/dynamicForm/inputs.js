// include input, textarea
export function createInput(item) {
  const input = document.createElement(item.type)
  input.setAttribute('class', item.className)
  input.setAttribute('placeholder', item.placeHolder)
  input.setAttribute('type', item.eleType)
  input.setAttribute('name', item.name)
  input.setAttribute('value', item.value)
  input.innerHTML = item.value
  return input
}

export function createLabel(labelText, labelClass) {
  const label = document.createElement('LABEL')
  const text = document.createTextNode(labelText)
  label.setAttribute('for', labelText)
  label.setAttribute('class', labelClass)
  label.appendChild(text)
  return label
}

export function createParentDiv(divClass) {
  const div = document.createElement('DIV')
  div.setAttribute('class', divClass)
  return div
}

export function createSubmitButton(myForm) {
  const findButton = myForm.find((element) => {
    return element.ele.includes('button-ready')
  })
  if (findButton) {
    const button = document.createElement('BUTTON')
    button.setAttribute('class', findButton.className)
    button.innerHTML = findButton.text
    return button
  }
  return null
}
