import type { Photo, Question, Topic } from '$lib/types';

/* width and height are the w512 copy's, so the page can hold its shape */
const photo = (path: string, alt: string, width: number, height: number): Photo => ({
	src: `https://pixelflare.cc/alicia/${path}`,
	alt,
	width,
	height
});

export const avatar = 'https://pixelflare.cc/alicia/profile-pictures/alicia-github';

/* ids are #links, each string is a message, [label](href) becomes a link */
export const topics: Topic[] = [
	{
		title: 'The projects',
		questions: [
			{
				id: 'ideas',
				question: 'Where do your project ideas come from?',
				answer: [
					'Usually I build things to solve a specific problem that I have faced, ' +
						'when I’ve not been able to find anything else which solves it adequately. ' +
						'But sometimes, things are just fun to build!',
					'[Web-Check](https://github.com/Lissy93/web-check) was born from the frustration ' +
						'from having to run 20 different commands and read their complicated output, ' +
						'just to determine basic website info and security.',
					'Whereas [AdGuardian-Term](https://github.com/Lissy93/AdGuardian-Term) ' +
						'was just a fun idea, ' +
						'I wanted to try out using Rust to build an interactive real-time TUI ' +
						'so I could have a little screen showing my live network traffic.'
				]
			},
			{
				id: 'fondest',
				face: 'love',
				question: 'Which project are you secretly fondest of?',
				answer: [
					'It’s an old one, but probably [twitter-sentiment-visualisation]' +
						'(https://github.com/Lissy93/twitter-sentiment-visualisation). ' +
						'Back in 2014 it seemed really cool to have a real-time feed ' +
						'of the most happiest and saddest areas of the world ' +
						'and most positive and negative topics. ' +
						'And I learnt SO much about early machine learning, real-time streaming, ' +
						'data visualisations, architecture, distributed hosting ' +
						'and both backend and frontend tech.'
				]
			},
			{
				id: 'frameworks',
				question: 'You built the same app in ten frameworks. Which one won?',
				answer: [
					'Over the years, I’ve ended up working with a lot of different frontend frameworks, ' +
						'sometimes out of necessity and sometimes choice. ' +
						'A couple of years ago, I decided to build the same app, ' +
						'in 10 of the most popular frameworks ' +
						'(in [framework-benchmarks](https://github.com/Lissy93/framework-benchmarks)), ' +
						'and benchmark them on performance, complexity and developer experience. ' +
						'For the full results, I blogged about this ' +
						'[here](https://dev.to/lissy93/i-built-an-app-in-every-frontend-framework-4a9g). ' +
						'But in short, I think that Svelte wins. ' +
						'It’s got a really good balance between being lightweight and easy to work with.',
					'But honestly, which framework you choose really depends on what you’re building. ' +
						'I put together a little comparison tool, ' +
						'[stack-match](https://stack-match.as93.net/) which can help you choose ' +
						'based on the factors which are most important to your application.'
				]
			},
			{
				id: 'web-check',
				face: 'ooh',
				question: 'What was it like when Web Check took off?',
				answer: [
					'Honestly, I was surprised. I built [web-check](https://github.com/lissy93/web-check) ' +
						'just as a fun side project, ' +
						'to make website security checking and OSINT a bit easier. ' +
						'It doesn’t really do anything which can’t already be done with basic CLI tools, ' +
						'but I guess bringing everything together ' +
						'and displaying actionable results from the raw data is useful to others.',
					'After I launched it, it went very suddenly from just a few users a day, ' +
						'right up to over 100k daily lookups. ' +
						'Which meant I then needed to do some very rushed server migrations, ' +
						'to keep it fast and affordable to run.'
				]
			},
			{
				id: 'oddest',
				question: 'What’s the oddest way someone has used something you made?',
				answer: [
					'Well, I’m always impressed with how imaginative people are with ' +
						'[dashy](https://github.com/lissy93/dashy). ' +
						'I’ve seen some really awesome dashboards people have created, ' +
						'and it gets used for all sorts of things I never expected!'
				]
			},
			{
				id: 'underrated',
				question: 'Which project deserved more love than it got?',
				answer: [
					'Maybe [readme-contribs](https://github.com/lissy93/readme-contribs). ' +
						'It creates embeddable widgets for your project’s readme, ' +
						'so you can credit your contributors, sponsors and helpful users. ' +
						'I think it’s really important that we credit the people ' +
						'who have helped make our projects a success. ' +
						'And before this, the typical approach was to use GitHub Actions ' +
						'to automatically insert the list, ' +
						'which ends up just cluttering up your commit history.',
					'I tried to make it as performant, reliable and configurable as possible, ' +
						'with a little GUI ([readme-contribs.as93.net](https://readme-contribs.as93.net/)) ' +
						'to make usage easier. ' +
						'But to this day, I think it’s mostly just me using this.'
				]
			},
			{
				id: 'broke',
				face: 'wince',
				question: 'Have you ever shipped something that broke badly?',
				answer: [
					'Oh yes 😅 So many times!',
					'In 2010, I made a fun little app ' +
						'([revision-quizzes](https://github.com/Lissy93/revision-quizzes)) ' +
						'so me and my friends could revise for our GCSEs together. ' +
						'Within a day, somebody found a stored XSS ' +
						'and covered the homepage with GIFs of cats running from cucumbers.',
					'I like to think I’ve learnt from my mistakes, ' +
						'and now have much more rigorous CI for all PRs, ' +
						'as well as proper error handling, logging ' +
						'and everything in place for easy roll-backs. ' +
						'But mistakes still happen, and I’ve still got a lot to learn!'
				]
			}
		]
	},
	{
		title: 'Open source life',
		questions: [
			{
				id: 'unexpected',
				face: 'ooh',
				question: 'What’s the most unexpected thing open source has brought you?',
				answer: [
					'Friends :)',
					'I’ve met some really awesome people, ' +
						'and have been able to jam with them on all sorts of projects, ' +
						'and I’ve learned SO much from them.',
					{
						photos: [
							photo(
								'images/github-crew.jpg',
								'A selfie of Alicia and four friends at GitHub Universe 2024',
								512,
								344
							)
						]
					}
				]
			},
			{
				id: 'kindest',
				face: 'grin',
				question: 'What’s the kindest message you’ve had from someone who uses your stuff?',
				answer: [
					'Honestly, just hearing that someone has found something I built vaguely useful ' +
						'always makes my day. ' +
						'And I absolutely love hearing about how people are using them ' +
						'(like [dashy#505](https://github.com/Lissy93/dashy/discussions/505)). ' +
						'Even little comments on blog posts ' +
						'(like [this one](https://dev.to/cadnav/comment/249h0)) make me smile.'
				]
			},
			{
				id: 'worries',
				face: 'worried',
				question: 'What worries you about open source right now?',
				answer: [
					'With AI, the volume is becoming almost unsustainable for maintainers to keep up with. ' +
						'It’s becoming increasingly common for people ' +
						'to never lay eyes on the code they’re shipping. ' +
						'And this makes me sad, as somebody who loves the craft of coding, ' +
						'I miss the old days where we took pride in every line.'
				]
			},
			{
				id: 'contribute',
				question: 'I’d like to contribute to one of your projects. Where do I start?',
				answer: [
					'I’m always open to new contributors, just find a project which interests you, ' +
						'identify a pain point, or something which can be improved, neatened or fixed, ' +
						'and go ahead and submit a PR. ' +
						'If you’re new to open source, I’m always happy to help, just reach out :)'
				]
			}
		]
	},
	{
		title: 'You',
		questions: [
			{
				id: 'lissy93',
				question: 'Where does “Lissy93” come from?',
				answer: [
					'I don’t think I put much thought into it, ' +
						'chose it when I was still a kid, creating my GitHub account! ' +
						'My friends call me Lissy (short for Alicia), ' +
						'and 93 is just my birth year (yeah, I’m old!).'
				]
			},
			{
				id: 'dinosaur',
				face: 'wink',
				question: 'Why the dinosaur?',
				answer: ['Because dinosaurs are awesome 🦖']
			},
			{
				id: 'army',
				face: 'wince',
				question: 'What did ten years in the Army Reserves teach you?',
				answer: ['To be grateful for every minute in a nice, warm, safe office 😅']
			},
			{
				id: 'astronomy',
				face: 'starry',
				question: 'What got you into astronomy?',
				answer: [
					'Space puts everything into scale, it’s just so massive, beautiful and impressive. ' +
						'And all of humanity is just a tiny speck in the grand scheme of things.'
				]
			},
			{
				id: 'hackathon',
				face: 'grin',
				question: 'What’s the best hackathon prize?',
				answer: [
					'There was a hackathon in 2019 called infra-hack. ' +
						'They rented out a train carriage, so we travelled around the UK hacking away, ' +
						'and spent the night in the Bletchley Park computing museum! ' +
						'Anyway, Network Rail’s prize was a behind the scenes tour of King’s Cross, ' +
						'and TfL’s prize was an inside look at the DLR control center! ' +
						'I love trains, so these were insanely cool!',
					{
						photos: [
							photo(
								'photos/dsc_1136.jpg',
								'A rail control room, full of desks and screens',
								512,
								288
							),
							photo('photos/dsc_1121.jpg', 'Long racks of signalling relays and wiring', 512, 288),
							photo(
								'photos/dsc_1096.jpg',
								'People in orange hi-vis walking down a dark, wet railway tunnel',
								512,
								288
							),
							photo(
								'photos/dsc_1068.jpg',
								'Alicia in a Network Rail hard hat, on a rooftop above a London street',
								512,
								384
							),
							photo(
								'photos/dsc_1035.jpg',
								'Behind a huge station clock face, looking out through its glass',
								512,
								512
							),
							photo(
								'photos/dsc_1057.jpg',
								'King’s Cross clock tower, with St Pancras behind it',
								512,
								288
							),
							photo(
								'photos/dsc_1081.jpg',
								'The long glass roofs of King’s Cross, with cranes on the skyline',
								512,
								344
							),
							photo(
								'photos/dsc_1117.jpg',
								'An LNER train and a Great Northern train at King’s Cross',
								512,
								288
							)
						]
					}
				]
			}
		]
	},
	{
		title: 'Quick-fire',
		quick: true,
		questions: [
			{
				id: 'pub',
				question: 'Usual order at the pub?',
				answer: ['Can’t go wrong with a pint of London Pride']
			},
			{
				id: 'domain',
				question: 'What’s the story behind 010000010110110001101001011000110110100101100001.com?',
				answer: [
					'Don’t drink and ' +
						'[buy domains](https://x.com/Lissy_Sykes/status/1766418827229692002).'
				]
			}
		]
	}
];

/* the chat's last word, after every topic */
export const ending: Question = {
	id: 'ask',
	face: 'grin',
	question: 'Got a question that isn’t here?',
	answer: ['[Ask me](/contact)! I love hearing from people :)']
};
