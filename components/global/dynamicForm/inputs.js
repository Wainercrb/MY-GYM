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

export function createSelect(item) {
  const select = document.createElement(item.type)
  select.setAttribute('class', item.className)
  select.setAttribute('placeholder', item.placeHolder)
  select.setAttribute('type', item.eleType)
  select.setAttribute('name', item.name)
  select.setAttribute('value', item.value)
  appendOptionsToSelect(select, item.options)
  setSelectValue(select, item)
  return select
}

export function createLabel(item) {
  const label = document.createElement('LABEL')
  const text = document.createTextNode(item.labelText)
  label.setAttribute('for', item.labelText)
  label.setAttribute('class', item.labelClass)
  label.appendChild(text)
  return label
}

export function createParentDiv(item) {
  const div = document.createElement('DIV')
  div.setAttribute('class', item.parentDivClass)
  return div
}

export function createSubmitButton(form) {
  const findButton = form.find((element) => {
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

function appendOptionsToSelect(ele, options) {
  options.forEach((option) => {
    const node = document.createElement('option')
    node.value = option.value
    node.text = option.text
    ele.appendChild(node)
  })
}

function setSelectValue(ele, item) {
  const index = item.options.findIndex((option) => {
    return option.value.includes(item.value)
  })
  if (index > -1) {
    ele.selectedIndex = index
  }
}
