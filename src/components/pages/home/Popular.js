import { BASE_URL } from "../../constants/api";
import { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Popular(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function getData() {
			try {
				const response = await axios.get(BASE_URL);
				setData(response.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getData();
	}, []);

	if (loading) return <div className='loader'></div>;

	if (error) return <div>An error :</div>;

	return (
		<div className='d-flex my-3'>
			<Row className='popular'>
				{data
					.filter(hotels => hotels.type === props.type)
					.map(data => {

						return (
							<Col lg={3} sm={6} key={data._id}>
								<Card className='mt-4 card'>
									<Link to={`/detail/${data._id}`}>
										<Card.Img
											className='card__img'
											variant='top'
											src={data.img}
										/>
										<Card.Body>
											<Card.Title className='card-title text-center my-1'>
												{data.title}
											</Card.Title>

											<Card.Text
												dangerouslySetInnerHTML={{
													__html: `${data.price}  kr`,
												}}
											></Card.Text>
											<Button variant='success'> Book a room</Button>
										</Card.Body>
									</Link>
								</Card>
							</Col>
						);
					})}
			</Row>
		</div>
	);
}
