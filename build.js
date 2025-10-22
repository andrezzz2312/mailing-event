const fs = require('fs-extra')
const path = require('path')
const mjml2html = require('mjml')
const Handlebars = require('handlebars')
const readlineSync = require('readline-sync')

let lang = process.argv[2]
if (!lang) {
	lang = readlineSync.question(
		'Ingresa el lenguaje de la plantilla (ej: es, en): '
	)
}

// Registrar las rutas de la carpeta partials
const partialsDir = path.join(__dirname, 'src', 'partials')
fs.readdirSync(partialsDir).forEach((file) => {
	if (path.extname(file) === '.mjml') {
		const partialName = path.basename(file, '.mjml')
		const partialContent = fs.readFileSync(path.join(partialsDir, file), 'utf8')
		Handlebars.registerPartial(partialName, partialContent)
	}
})

// Cargar base.mjml y event-invitation.hbs
const baseLayout = fs.readFileSync('src/layouts/base.mjml', 'utf8')
const template = fs.readFileSync('src/templates/event-invitation.hbs', 'utf8')

// Chequear si existe un archivo de traduccion con el lenguaje seleccionado, y cargarlo en caso que exista
const translationPath = path.resolve(
	__dirname,
	'src',
	'translations',
	`${lang}.json`
)
if (!fs.existsSync(translationPath)) {
	console.error(
		`❌ El lenguaje de traducción "${lang}" no se encuentra en ${translationPath}`
	)
	process.exit(1)
}
translation = require(translationPath)

// Compilar el body traducido conjunto con base.mjml (estilos)
const compiledBody = Handlebars.compile(template)(translation)
const finalMjml = baseLayout.replace('{{{body}}}', compiledBody)

// Convertir MJML → HTML
const { html, errors } = mjml2html(finalMjml, { validationLevel: 'soft' })

if (errors.length) console.warn(errors)

// Crear el correo requerido en la carpeta dist
fs.outputFileSync(`dist/email-${lang}.html`, html)

console.log(`✅ Correo creado exitosamente: dist/email-${lang}.html`)
