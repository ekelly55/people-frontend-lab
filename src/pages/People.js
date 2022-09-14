import { useState, useEffect } from 'react'

const People = (props) =>{

    const [people, setPeople] = useState([])

		const BASE_URL = "https://people-backend-lab.herokuapp.com/people";

    const getPeople = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allPeople = await response.json()
            setPeople(allPeople)
        }catch(err){
            console.log(err)
        }

    }

    useEffect(()=>{getPeople()}, [])

    console.log(`There are ${people.length} people available to render`)

    const loaded = () => {
        return people?.map((person) => {
          return (
            <div key={person._id}>
              <h1>{person.name}</h1>
              <img src={person.image} />
              <h3>{person.title}</h3>
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
        <section className="people-list">{people && people.length ? loaded() : loading()}</section>
      );
   
}

export default People
