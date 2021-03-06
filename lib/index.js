const Enquirer = require('enquirer')

const instance = new Enquirer()

function convertOptions(options) {
  if (options.type === 'list') {
    options.type = 'select'
  } else if (options.type === 'checkbox') {
    options.type = 'multiselect'
  }

  options.limit = options.pageSize

  const prefix = options.prefix || ''
  const suffix = options.suffix || ''
  options.message = prefix + options.message + suffix

  if (typeof options.when === 'function') {
    options.skip = ({ anwsers }) => options.when(anwsers)
  }

  if (typeof options.validate === 'function') {
    options.validate = (value, { anwsers }) => options.validate(value, anwsers)
  }

  return options
}

function createCompatPrompt(questions = []) {
  const enquirer = new Enquirer()

  questions = questions.map(convertOptions)

  enquirer.on('prompt', (prompt, anwsers) => {
    if (typeof prompt.options.transformer === 'function') {
      prompt.format = async input => await prompt.options.transformer.call(
        prompt,
        input,
        anwsers,
        prompt.options
      )
    }

    if (typeof prompt.options.filter === 'function') {
      prompt.result = async input => await prompt.options.filter.call(
        prompt,
        input,
        anwsers
      )
    }

    if (typeof prompt.options.default === 'function') {
      prompt.default = async () => await prompt.options.default.call(
        prompt,
        anwsers
      )
    }

    if (typeof prompt.options.message === 'function') {
      prompt.message = async () => await prompt.options.message.call(
        prompt,
        anwsers
      )
    }
  })

  return enquirer.prompt(questions)
}

exports.prompt = createCompatPrompt
exports.registerPrompt = instance.register
exports.createPromptModule = () => createCompatPrompt
