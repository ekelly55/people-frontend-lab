import { useState, useEffect } from 'react'

import { Link } from "react-router-dom"

const People = (props) => {
    // state to hold formData

    const createPeople = async (personData) => {
        try {
            // make post request to create people
            const newPerson = await fetch(BASE_URL, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(personData),
            }
            );

            // testing API create request
            // console.log(await newPerson.json())

            // trigger fetch of updated People to replace stale content
            getPeople()

        } catch (err) {
            console.log(err)

        }
        console.log(personData)
        //undefined. it's not grabbing person data from the form...how is it supposed to?
    };

    const [newForm, setNewForm] = useState({
        name: "",
        image: "",
        title: "",
    });

    const BASE_URL = "https://people-backend-lab.herokuapp.com/people";

    // handleChange function for form
    const handleChange = (e) => {
        setNewForm({ ...newForm, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {

        e.preventDefault()
        const newPerson = await createPeople(newForm)
        //something is missing here. e.target?
        // reset the form
        console.log(e.target)
        setNewForm({ name: "", image: "", title: "" })

    }

    const [people, setPeople] = useState([])


    const getPeople = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allPeople = await response.json()
            setPeople(allPeople)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => { getPeople() }, [])

    console.log(`There are ${people.length} people available to render`)

    const loaded = () => {
        return people?.map((person) => {
            return (
                <div key={person._id} className='person-card'>
                    <Link to={`/people/${person._id}`}>

                        <h1>{person.name}</h1>
                        <img src={person.image} />
                        <h3>{person.title}</h3>
                    </Link>
                </div>

            );
        });
    };

    const loading = () => (
        <section className="people-list">
            <h1>
                Loading...
                <span>
                    <img
                        className="spinner"
                        src="https://freesvg.org/img/1544764567.png"
                    />{" "}
                </span>
            </h1>
        </section>
    );

    return (
        <section className='personIndexMain'>
            <div className="addNewForm">
                <h2>Create a new person</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newForm.name}
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={newForm.image}
                        name="image"
                        placeholder="image URL"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={newForm.title}
                        name="title"
                        placeholder="title"
                        onChange={handleChange}
                    />
                    <input type="submit" value="Create Person" />
                </form>
            </div>

            <section className="people-list">

                {people && people.length ? loaded() : loading()
                    //what does this line mean? if people and people length exist, then set loaded() as loading?
                }</section>

        </section>
    );

}

export default People
