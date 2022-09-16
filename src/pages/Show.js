import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Show = () => {
  const [person, setPerson] = useState(null)
  const { id } = useParams()
  const URL = `https://people-backend-lab.herokuapp.com/people/${id}`

  const getPerson = async () => {
    try {
      const response = await fetch(URL)
      const result = await response.json()
      setPerson(result)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(`Current Person: ${JSON.stringify(person)}`)

  useEffect(() => {
    getPerson()
  }, [])

// After testing that person is defined you can use a ternary statement to
// conditionally render either a person's data or a loading message

const loaded = () => (
    <div className="person">
        <h1>Show Page</h1>
        <h2>{person.name}</h2>
        <h2>{person.title}</h2>
        <img src={person.image} alt={person.name+" image"} />
</div>
)

const loading = () => {
    return <h1>Loading.........</h1>
            // alternatively you can use the spinner 
}

return people ? loaded() : loading()


}

export default Show
