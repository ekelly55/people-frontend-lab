import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

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
    
    const navigate = useNavigate()
    
    const [editForm, setEditForm] = useState(null)

    const handleChange = event => {
          setEditForm({ ...editForm, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        console.log("submit fired")
        e.preventDefault()
        const options = {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editForm)
        }
        try {
            const response = await fetch(URL, options)
            const updatedPerson = await response.json()
            setPerson(updatedPerson)
            setEditForm(updatedPerson)

        } catch(err) {
            console.log(err)
        }
    }

    const removePerson = async () => {
        try {
            const options = {
                method: "DELETE"
            }
    
            const response = await fetch(URL, options)
    
            // you can inspect the response for debugging or extended 
            //functionality. 
            const deletedPerson = await response.json()
    
            // console.log(deletedPerson)
            navigate('/')
    
            // navigate will change the browser's URL
            // which will cause react-router to "redirect" to home page;
            // the Main will then re-render the People component
            // upon mount People will fetch the updated index of people data
    
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    
    
    const updatePerson = async (e) => {
        e.preventDefault()
    
        // make put request to update a person
        try {
          await fetch(URL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editForm),
          })
    
          // trigger a re-render after the fetch is complete
          getPerson()
        } catch (err) {
          console.log(err)
        }
      }
    




    // After testing that person is defined you can use a ternary statement to
    // conditionally render either a person's data or a loading message

    const loaded = () => (
        <div className="person">
            <section>
	<h2>Edit this Person</h2>
    <form onSubmit={handleSubmit}>
    <input
        type="text"
        value= {editForm.name}
        name="name"
        placeholder="name"
        onChange={handleChange}
      />
     <button clasName="edit" onClick={handleSubmit}>Edit Person</button>
  </form>
</section>
            <h1>{person.name}</h1>
            <h2>{person.title}</h2>
            <img src={person.image} alt={person.name + " image"} />
            <div>
                <button className="delete" onClick={removePerson}>
                    Remove Person
                </button>
            </div>
            
        </div>
    )

    const loading = () => {
        return <h1>Loading.........</h1>
        // alternatively you can use the spinner 
    }

    

    return person ? loaded() : loading()

}

export default Show
