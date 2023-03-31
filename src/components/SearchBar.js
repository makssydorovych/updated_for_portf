import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "./constants/api";
import { Form, FormControl, ListGroup } from "react-bootstrap";

export default function SearchBar() {
	const [search, setSearch] = useState([]);
	const [searcMatch, setSearcMatch] = useState([]);
	const url = BASE_URL;

	useEffect(() => {
		const loadSearch = async () => {
			const response = await axios.get(url);
			setSearch(response.data);
		};

		loadSearch();
	}, [url]);

	const searchSearch = text => {
		if (!text) {
			setSearcMatch([]);
		} else {
			let matches = search.filter(search => {
				const regex = new RegExp(`${text}`, "gi");
				return search.title.match(regex);
			});
			setSearcMatch(matches);
		}
	};

	return (
		<Form className='home__search'>
			<FormControl
				type='search'
				placeholder='Search accommondation...'
				onChange={e => searchSearch(e.target.value)}
				className='me-2'
				aria-label='Search'
			/>
			<ListGroup>
				{searcMatch
					.filter(hotels => hotels.price > 0)
					.map(search => (
						<Link
							className='home__search--group'
							key={search._id}
							to={`Detail/${search._id}`}
						>
							<p>{search.title}</p>
							<p>{search.price} NOK</p>
							<img
								className='home__search--img'
								src={search.img}
								alt={search.title}
							/>
							<div></div>
						</Link>
					))}
			</ListGroup>{" "}
		</Form>
	);
}
