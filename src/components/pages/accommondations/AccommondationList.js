import { useState, useEffect } from "react";
import AccommondationItem from "./AccommondationItem";
import { Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import Heading from "../../Heading";

export default function AccommondationList() {
	const [hotels, setHotels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function getHotels() {
			try {
				const response = await fetch(BASE_URL);
				if (response.ok) {
					const json = await response.json();
					setHotels(json);
				} else {
					setError("An error has occured.");
				}
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getHotels();
	}, []);

	if (loading) return <div className='loader '></div>;

	if (error) return <div>An error :</div>;

	return (
		<Row>
			<Heading title='Accommondations' />
			{hotels
				.filter(hotels => hotels.price > 0)
				.map(function (hotel) {
					const { _id, title, description, img, type } = hotel;
					const { price } = hotel.price;

					return (
						<Col lg={3} md={4} sm={6} key={_id} className='p-0'>
							<AccommondationItem
								id={_id}
								title={title}
								description={description}
								image={img}
								price={price}
								type={type}
							/>
						</Col>
					);
				})}
		</Row>
	);
}
