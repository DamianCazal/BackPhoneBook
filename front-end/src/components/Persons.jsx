const persons = ({ array, deletePerson }) => {
  return (
    <div>
      <ul>
        {array.map(person => 
        <li className='note' key={person.id}>{person.name} {person.number} 
          <button onClick={() => deletePerson(person)}>Delete</button>
        </li>)}
      </ul>
    </div>
  );
}
export default persons;