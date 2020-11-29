const jestConfig = {
	verbose: true,
	testURL: "http://localhost/",
	preset: '@vue/cli-plugin-unit-jest',
	'transform': {
	  '^.+\\.jsx?$': 'babel-jest',
	},
	testMatch: ['**/__tests__/*.js?(x)', '**/__tests__/components/*.js?(x)', '**/__tests__/views/*.js?(x)'],
	// collectCoverage: true, //hmmmmm vv
    // collectCoverageFrom: [
    //     "Test/*.{js,vue}",
    //     "!**/node_modules/**"
    // ],
    // coverageReporters: [
    //     "html",
    //     "text-summary"
    // ],
  }
  
module.exports = jestConfig