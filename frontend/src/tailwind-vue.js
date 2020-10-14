/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.

View the full documentation at https://tailwindcss.com.
*/

// When adding/changing colors or using other colors, consider checking the
// contrast at https://webaim.org/resources/contrastchecker/ to ensure that
// fgColors have sufficient contrast on bgColors

// Be careful adding more colors.  Extra colors can add a ton of size to the
// compiled file.

//All of the variables for the colors are single characters
//in order to not impact the compile size.
//The variables are based off of the color name
let bgColors = {
	"blur": "var(--b, rgba(0,0,0,.3))",
	"header": "#4f5d75",
	"darkBlue": "#2d3142",
	"lightBlue": "#bfc0c0",
	"transparent": "transparent",
	"orange": "#ef8354",
	"teal": "#15aabf",
	"gray": "#bfc0c0",
};

let fgColors = {
	"header": bgColors['header'],
	"darkBlue": bgColors['darkBlue'],
	"lightBlue": bgColors['lightBlue'],
	"transparent": bgColors['transparent'],
	"orange": bgColors['orange'],
	"teal": bgColors['teal'],
	"gray": bgColors['gray'],
	"dark": "black",
};

let borderColors = Object.assign({}, {
	"header": bgColors['header'],
	"darkBlue": bgColors['darkBlue'],
	"lightBlue": bgColors['lightBlue'],
	"orange": bgColors['orange'],
	"transparent": "transparent",
	"teal": bgColors['teal'],
	"gray": bgColors['gray'],
});


var allColors = Object.assign({}, bgColors, fgColors, borderColors);

module.exports = {
	prefix: '',
	important: false,
	separator: ':',

	theme: {
		colors: allColors,
		// Every responsive breakpoint adds a decent amount of size to this file,
		// so be careful adding anything!
		screens: {
			'sm': '600px',
			'md': '900px',
			'lg': '1200px'
		},
		fontFamily: {
			'sans': [
				'"Open Sans"',
				'"Source Sans"',
				'"Myriad Pro"',
				'Arial',
				'sans-serif'
			],
			'poppins': [
				'"Poppins"'
			]
		},
		fontSize: {
			'2xs': '0.75rem', // 12px
			'xs': '0.875rem', // 14px
			'sm': '1rem',	  // 16px
			'md': '1.125rem', // 18px
			'lg': '1.25rem',  // 20px
			'xlg': '1.5rem',
			'xxlg': '1.75rem',
			'xxxlg': '2rem'
		},
		fontWeight: {
			'normal': 400,
			'bold': 600,
			'bolder': 800,
		},
		lineHeight: {
			'none': 1,
			'normal': 1.2,
			'loose': 1.8,
		},
		textColor: fgColors,
		backgroundColor: bgColors,
		backgroundSize: {
			'auto': 'auto',
			'cover': 'cover',
			'contain': 'contain',
		},
		borderWidth: {
			default: '1px',
			'0': '0',
			'2': '2px',
			'4': '4px',
			'8': '8px',
		},
		borderColor: Object.assign({ default: allColors['gray2'] }, borderColors),
		borderRadius: {
			'none': '0',
			default: '.25rem',
			'lg': '.5rem',
			'full': '9999px',
		},
		width: {
			'auto': 'auto',
			'px': '1px',
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '.75rem',
			'4': '1rem',
			'6': '1.5rem',
			'8': '2rem',
			'10': '2.5rem',
			'12': '3rem',
			'16': '4rem',
			'24': '6rem',
			'32': '8rem',
			'48': '12rem',
			'64': '16rem',
			'1/2': '50%',
			'1/3': '33.33333%',
			'2/3': '66.66667%',
			'1/4': '25%',
			'3/4': '75%',
			'full': '100%',
			'screen': '100vw'
		},
		height: {
			'auto': 'auto',
			'px': '1px',
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '0.75rem',
			'4': '1rem',
			'6': '1.5rem',
			'8': '2rem',
			'10': '2.5rem',
			'12': '3rem',
			'16': '4rem',
			'24': '6rem',
			'32': '8rem',
			'48': '12rem',
			'64': '16rem',
			'full': '100%',
			'screen': '100vh'
		},
		minWidth: {
			'0': '0',
			'full': '100%',
		},
		minHeight: {
			'0': '0',
			'full': '100%',
			'screen': '100vh'
		},
		maxWidth: {
			's': '20rem',
			'md': '40rem',
			'l': '60rem',
			'xl': '80rem',
			'2xl': '100rem',
			'full': '100%',
		},
		maxHeight: {
			'full': '100%',
			'screen': '100vh',
		},
		padding: {
			'px': '1px',
			'0': '0',
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '0.75rem',
			'4': '1rem',
			'5': '1.25rem',
			'6': '1.5rem',
			'8': '2rem',
			'10': '2.5rem',
			'12': '3rem',
			'16': '4rem',
			'inherit': 'inherit'
		},
		margin: {
			'auto': 'auto',
			// Negative class is -m{side?}-{size}
			'-px': '-1px',
			'-0': '-0',
			'-1': '-0.25rem',
			'-2': '-0.5rem',
			'-3': '-0.75rem',
			'-4': '-1rem',
			'-5': '-1.25rem',
			'-6': '-1.5rem',
			'-8': '-2rem',
			'-10': '-2.5rem',
			'-12': '-3rem',
			'-16': '-4rem',
			// Positive class is m{side?}-{size}
			'px': '1px',
			'0': '0',
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '0.75rem',
			'4': '1rem',
			'5': '1.25rem',
			'6': '1.5rem',
			'8': '2rem',
			'10': '2.5rem',
			'12': '3rem',
			'16': '4rem',
			'inherit': 'inherit'
		},
		zIndex: {
			'auto': 'auto',
			'0': 0,
			'10': 10,
			'20': 20,
			'30': 30,
			'40': 40,
			'50': 50
		},
		opacity: {
			'0': '0',
			'25': '.25',
			'30': '.3',
			'50': '.5',
			'75': '.75',
			'100': '1',
		},
	},
	variants: {
		alignContent: ['responsive'],
		alignItems: ['responsive'],
		alignSelf: ['responsive'],
		appearance: ['responsive'],
		backgroundAttachment: ['responsive'],
		backgroundColor: ['responsive', 'hover', 'focus'],
		backgroundPosition: ['responsive'],
		backgroundRepeat: ['responsive'],
		backgroundSize: ['responsive'],
		borderCollapse: [],
		borderColor: ['responsive', 'hover', 'focus'],
		borderRadius: ['responsive'],
		borderStyle: ['responsive'],
		borderWidth: ['responsive'],
		cursor: ['responsive'],
		display: ['responsive'],
		flex: ['responsive'],
		flexDirection: ['responsive'],
		flexShrink: ['responsive'],
		flexGrow: ['responsive'],
		flexWrap: ['responsive'],
		float: ['responsive'],
		fontFamily: ['responsive'],
		fontSize: ['responsive'],
		fontSmoothing: ['responsive', 'hover', 'focus'],
		fontStyle: ['responsive', 'hover', 'focus'],
		fontWeight: ['responsive', 'hover', 'focus'],
		height: ['responsive'],
		inset: ['responsive'],
		justifyContent: ['responsive'],
		letterSpacing: ['responsive'],
		lineHeight: ['responsive'],
		listStylePosition: ['responsive'],
		listStyleType: ['responsive'],
		margin: ['responsive'],
		maxHeight: ['responsive'],
		maxWidth: ['responsive'],
		minHeight: ['responsive'],
		minWidth: ['responsive'],
		opacity: ['responsive'],
		outline: ['focus'],
		overflow: ['responsive'],
		padding: ['responsive'],
		placeholderColor: ['responsive', 'hover'],
		pointerEvents: ['responsive'],
		position: ['responsive'],
		resize: ['responsive'],
		tableLayout: ['responsive'],
		textAlign: ['responsive'],
		textColor: ['responsive', 'hover', 'focus'],
		textDecoration: ['responsive', 'hover', 'focus'],
		textTransform: ['responsive', 'hover', 'focus'],
		userSelect: ['responsive'],
		verticalAlign: ['responsive'],
		visibility: ['responsive'],
		whitespace: ['responsive'],
		width: ['responsive'],
		wordBreak: ['responsive'],
		zIndex: [],
	},
	corePlugins: {
		boxShadow: false,
		container: false,
		letterSpacing: false,
		fill: false,
		stroke: false
	},
	plugins: [
		function({ addUtilities }) {
			const newUtilities = {
				'.sideDesktop': {
					width: '235px',
					minWidth: '235px',
					transform: 'translateX(0)',
				},
				'.sideMobile': {
					transform: 'translateX(-100%)',
					transition: 'transform .2s',
					width:'100%',
					maxWidth:'18em',
					height:'fit-content',
					minHeight:'100%'
				}
			}
			addUtilities(newUtilities, {
				variants:['responsive'],
			})
		}
	]
}
