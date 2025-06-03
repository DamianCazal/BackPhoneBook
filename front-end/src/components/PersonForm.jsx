const PersonForm = (props) => {
  return (
    <div>
      <form>
        <div>
          Name: <input placeholder='Introduce un nombre' value={props.stateInputName} onChange={props.eventName} />
        </div>
        <div>
          Phone: <input placeholder='Introduce tu telefono' value={props.stateInputPhone} onChange={props.eventPhone} />
        </div>
        <div>
          <button type="submit" onClick={props.eventPersons}>add</button>
        </div>
      </form>
    </div>
  );
}
export default PersonForm;