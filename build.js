const fs = require('fs-extra')
const path = require('path')
const mjml2html = require('mjml')
const Handlebars = require('handlebars')

// Register partials
const partialsDir = path.join(__dirname, 'src', 'partials')
fs.readdirSync(partialsDir).forEach((file) => {
	const partialName = path.basename(file, '.mjml')
	const partialContent = fs.readFileSync(path.join(partialsDir, file), 'utf8')
	Handlebars.registerPartial(partialName, partialContent)
})

// Load base layout and template
const baseLayout = fs.readFileSync('src/layouts/base.mjml', 'utf8')
const template = fs.readFileSync('src/templates/event-invitation.hbs', 'utf8')

// Choose language
const lang = process.argv[2] || 'es'
const translation = require(`./src/translations/${lang}.json`)

// Compile the Handlebars template
const compiledBody = Handlebars.compile(template)(translation)
const finalMjml = baseLayout.replace('{{{body}}}', compiledBody)

// Convert MJML → HTML
const { html, errors } = mjml2html(finalMjml, { validationLevel: 'soft' })

if (errors.length) console.warn(errors)
fs.outputFileSync(`dist/email-${lang}.html`, html)

console.log(`✅ Email built successfully: dist/email-${lang}.html`)
