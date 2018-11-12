const Enquirer = require('enquirer')

const instance = new Enquirer()

function convertOptions(options) {
  if (options.type === 'list') {
    options.type = 'select'
  }

  options.result = options.filter

  const prefix = options.prefix || ''
  const suffix = options.suffix || ''
  options.message = prefix + options.message + suffix

  options.when = options.when || (() => true)

  return options
}

function createCompatPrompt(questions = []) {
  const enquirer = new Enquirer()

  questions = questions.map(convertOptions)

  enquirer.on('prompt', async (prompt, anwsers) => {
    const condition = await prompt.options.when(anwsers)
    if (condition === false) {
      prompt.render = () => ''
      prompt.submit()
    }

    if (typeof prompt.options.transformer === 'function') {
      prompt.format = async input => await prompt.options.transformer.call(
        prompt,
        input,
        anwsers,
        prompt.options
      )
    }

    if (typeof prompt.options.validate === 'function') {
      prompt.validate = async input => await prompt.options.validate.call(
        prompt,
        input,
        anwsers
      )
    }
  })

  return enquirer.prompt(questions)
}

exports.prompt = createCompatPrompt
exports.registerPrompt = instance.register
exports.createPromptModule = () => createCompatPrompt
