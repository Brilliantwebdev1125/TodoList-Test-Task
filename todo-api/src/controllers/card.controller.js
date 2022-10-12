const fs = require('fs');

exports.create = async (req, res) => {
	const { status, title, description } = req.body;
	const started_at = new Date().toISOString().replace('T', ' ').substring(0, 19);
	const cards = require('../database/cards.json');
	const length = cards.length;
	const id = length === 0 ? 1 : cards[length - 1].id + 1;

	let card = {
		id,
		status,
		title,
		description,
		started_at,
		completed_at: '',
	};

	cards.push(card);

	fs.writeFile('src/database/cards.json', JSON.stringify(cards), (err) => {
		if (err) res.status(500).json({ message: err.message || 'Something went wrong, please try again!' });
		res.status(200).json(cards);
	});
};

exports.readByID = async (req, res) => {
	const { id } = req.params;
	const cards = require('../database/cards.json');
	for (let card of cards) {
		if (card.id === id) {
			res.status(200).json(card);
			return;
		}
	}
	res.status(500).json({ message: 'Not Found' });
};

exports.readAll = async (req, res) => {
	const cards = require('../database/cards.json');
	res.status(200).json(cards);
};

exports.update = async (req, res) => {
	const { id, status, title = '' } = req.body;
	const cards = require('../database/cards.json');
	let index = 0;
	for (let card of cards) {
		if (card.id == id) {
			if (title !== '') {
				cards[index].title = title;
			} else if (title === '') {
				if (status === 'progress') {
					cards[index].status = 'completed';
					cards[index].completed_at = new Date().toISOString().replace('T', ' ').substring(0, 19);
				}
				if (status === 'completed') {
					cards[index].status = 'progress';
					cards[index].completed_at = '';
				}
			}
			break;
		}
		index++;
	}
	fs.writeFile('src/database/cards.json', JSON.stringify(cards), (err) => {
		if (err) res.status(500).json({ message: err.message || 'Something went wrong, please try again!' });
		res.status(200).json(cards);
	});
};

exports.delete = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const cards = require('../database/cards.json');
	let index = 0;
	for (let card of cards) {
		if (card.id == id) {
			cards.splice(index, 1);
			break;
		}
		index++;
	}
	fs.writeFile('src/database/cards.json', JSON.stringify(cards), (err) => {
		if (err) res.status(500).json({ message: err.message || 'Something went wrong, please try again!' });
		res.status(200).json(cards);
	});
};
