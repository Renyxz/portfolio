export default function() {
	return {
		inputs: [
			{ label: 'Project name', placeholder: 'What is the name of your project?', ref: 'name' },
			{ label: 'Project date', placeholder: 'Publish date format: MM / YYYY', ref: 'date' },
			{ label: 'Demo URL', placeholder: 'Demo URL for this project', ref: 'demoURL' },
			{ label: 'Github repo URL', placeholder: 'Github repo URL for this project', ref: 'githubURL' },
			{ label: 'Youtube video URL', placeholder: 'Youtube video URL for this project', ref: 'ytURL' },
			{ label: 'Thumbnail URL', placeholder: 'Thumbnail URL for this project', ref: 'thumbnail' }
		]
	};
}