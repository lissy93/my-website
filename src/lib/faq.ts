import type { Question } from './types';

/* each id is the question's #link, and the first paragraph of an answer is its lead
   { show } drops in one of the About page's lists, kept up to date from about.ts, projects.ts and GitHub */
export const questions: Question[] = [
	{
		id: 'start',
		question: 'How did you get into this?',
		answer: [
			'From the first time I used a computer (at about 11), I was fascinated by how they worked. School was never my strong point, but something about computers just clicked for me, and I’ve been hooked ever since.',
			'This was back in 2005 - the days of dial-up and before computing was taught in schools, so to learn to program I’d get these massive 500-page books from the library, and read them through line-by-line!',
			'I started out with ActionScript and Java, before moving more into web technologies (with, don’t laugh, PHP!). My first real job was as a mobile developer.'
		]
	},
	{
		id: 'build',
		question: 'What do you build?',
		answer: [
			'I build privacy-respecting apps, then give them away for free.',
			'I’m a builder at heart. Whether it’s a global-scale trading platform or a fun little CLI tool to check website privacy, I love creating software that’s fast, accessible, secure—and actually helps people.',
			{ show: 'projects' }
		]
	},
	{
		id: 'free',
		question: 'Why is it all free?',
		answer: [
			{
				pull: 'It’s all open source, because the software you rely on should be something you can actually read.'
			},
			'Right now, Web-Check is not monetized at all. Actually, none of my projects are. I would never implement anything (like certain ads) which compromise the privacy of my end users.',
			'I receive a small amount of funding from GitHub Sponsors, which is just about enough to cover server costs, and I am super grateful to my sponsors as it’s them who keep apps like this free for everyone else.'
		]
	},
	{
		id: 'time',
		question: 'When do you find the time?',
		answer: [
			{
				day: 'I usually get up quite early, have a nice cuppa tea, and work my way through issues and PRs before heading to work.',
				night:
					'Then in the evening, that’s when the real coding happens! I probably spend about 4-6 hours most evenings working on various open source projects.'
			},
			{ pull: 'If you’re not having fun, you’re doing it wrong!' }
		]
	},
	{
		id: 'work',
		question: 'Where have you worked?',
		answer: [{ show: 'work' }]
	},
	{
		id: 'reach',
		question: 'How many people use your stuff?',
		answer: [{ show: 'numbers' }]
	},
	{
		id: 'setup',
		question: 'What’s your setup?',
		answer: [
			'My every-day setup is Linux (Arch, btw!), Firefox, Neovim and VS Code and the terminal.',
			'My favorite tools right now, are probably z, fzf and thef*ck.',
			'I love Linux, and (imo) have a neat dotfiles setup which I’m always tweaking.',
			'I have a small homelab, that I’m using to learn more about system administration, and host my own services to (attempt to) escape big tech.'
		]
	},
	{
		id: 'away',
		question: 'And away from the keyboard?',
		answer: [
			'I enjoy sports (I spent 10 years in the British Army reserves), and I also love a good adventure!',
			'After work, you’ll usually find me in the pub with friends and colleagues, chatting about the latest tech trends and sharing ideas.',
			'In my spare time, I’m usually tinkering with my homelab, building fun little projects, or failing at HackerRank challenges.',
			{ show: 'interests' }
		]
	},
	{
		id: 'more',
		question: 'Anything else?',
		answer: [
			{
				links: [
					{ label: 'Get in touch', href: '/contact' },
					{ label: 'Read my CV', href: 'https://cv.aliciasykes.com' },
					{ label: 'Sponsor me', href: 'https://github.com/sponsors/Lissy93' }
				]
			}
		]
	}
];
